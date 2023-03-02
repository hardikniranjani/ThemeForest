import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

function HeroSection() {
    return (
        <>
            <div className="hero-banner center" style={{ background: '#93d4f0' }}>
                <div className="container">
                    <h1><span className="count">57422</span> WP Themes &amp; Templates</h1>
                    <p className="lead">World Best Place For Graphics &amp; Designs Availabel on Pecozo</p>
                    <form className="mt-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-10 col-sm-12">
                                <div className="banner-search style-1">
                                    <div className="input-group">
                                        <div className="input-group-append hime_m">
                                            <div className="form-group b-r">
                                                <select id="category" className="js-states form-control select2-hidden-accessible" data-select2-id="category" tabIndex={-1} aria-hidden="true">
                                                    <option value data-select2-id={2}>&nbsp;</option>
                                                    <option value={1}>Resources</option>
                                                    <option value={2}>Collections</option>
                                                    <option value={3}>Freebies</option>
                                                    <option value={4}>Vectors</option>
                                                    <option value={5}>Photos</option>
                                                    <option value={6}>Icons</option>
                                                </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id={1} style={{ width: '170px' }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-category-container"><span className="select2-selection__rendered" id="select2-category-container" role="textbox" aria-readonly="true"><span className="select2-selection__placeholder">All resources</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation" /></span></span></span><span className="dropdown-wrapper" aria-hidden="true" /></span>
                                            </div>
                                        </div>
                                        <input type="text" className="form-control lio-rad" placeholder="e.g. responsive WordPress" />
                                        <div className="input-group-append">
                                            <button type="button" className="btn bt-round">
                                            {/* <i className="fa-regular fa-magnifying-glass"></i> */}
                                            <FontAwesomeIcon icon="fa-regular fa-magnifying-glass" />
                                                {/* <i className="ti-search" /> */}
                                                <i class="fa fa-search"></i>
                                                {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default HeroSection