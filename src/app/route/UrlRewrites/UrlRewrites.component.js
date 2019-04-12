/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryPage from 'Route/CategoryPage';
import ProductPage from 'Route/ProductPage';
import CmsPage from 'Route/CmsPage';
import NoMatch from 'Route/NoMatch';
import { getUrlParam } from 'Util/Url';

class UrlRewrites extends Component {
    componentWillMount() {
        const { requestUrlRewrite, match, location } = this.props;
        const urlParam = getUrlParam(match, location);
        requestUrlRewrite({ urlParam });
    }

    componentWillUnmount() {
        const { clearUrlRewrites } = this.props;
        clearUrlRewrites();
    }

    switcher({ type, id, url_key }) {
        const { props } = this;

        switch (type) {
        case 'PRODUCT':
            const newRoute = {
                ...props,
                location: {
                    ...props.location,
                    pathname: `/${ url_key }`
                }

            };
            return <ProductPage { ...newRoute } />;
        case 'CMS_PAGE':
            return <CmsPage { ...props } cmsId={ id } />;
        case 'CATEGORY':
            return <CategoryPage { ...props } categoryIds={ id } />;
        default:
            return <NoMatch { ...props } />;
        }
    }

    render() {
        const { urlRewrite } = this.props;

        if (urlRewrite && Object.entries(urlRewrite).length) {
            return this.switcher(urlRewrite);
        }

        return null;
    }
}

UrlRewrites.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired
    }).isRequired
};

export default UrlRewrites;