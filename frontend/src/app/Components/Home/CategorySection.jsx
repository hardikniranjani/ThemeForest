import React from 'react'

function CategorySection() {
  return (
    <section className="p-0 overlio-top">
    <div className="container">
      <div className="row">
        {/* Single Category */}
        <div className="col-lg-3 col-md-3 col-sm-6">
          <div className="urip_cated shadow">
            <div className="urip_cated_avater">
              <img src="./Pecozo - Digital Marketplace HTML Template_files/magento.svg" className="img-fluid" alt="" />
            </div>
            <div className="urip_cated_caps">
              <h3 className="cats_urip_title"><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Magento</a></h3>
              <span>200k Items</span>
            </div>
          </div>
        </div>
        {/* Single Category */}
        <div className="col-lg-3 col-md-3 col-sm-6">
          <div className="urip_cated shadow">
            <div className="urip_cated_avater">
              <img src="./Pecozo - Digital Marketplace HTML Template_files/prestashop.png" className="img-fluid" alt="" />
            </div>
            <div className="urip_cated_caps">
              <h3 className="cats_urip_title"><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">Prestashop</a></h3>
              <span>12k Items</span>
            </div>
          </div>
        </div>
        {/* Single Category */}
        <div className="col-lg-3 col-md-3 col-sm-6">
          <div className="urip_cated shadow">
            <div className="urip_cated_avater">
              <img src="./Pecozo - Digital Marketplace HTML Template_files/wordpress.svg" className="img-fluid" alt="" />
            </div>
            <div className="urip_cated_caps">
              <h3 className="cats_urip_title"><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">WordPress Themes</a></h3>
              <span>500k Items</span>
            </div>
          </div>
        </div>
        {/* Single Category */}
        <div className="col-lg-3 col-md-3 col-sm-6">
          <div className="urip_cated shadow">
            <div className="urip_cated_avater">
              <img src="./Pecozo - Digital Marketplace HTML Template_files/shopify.svg" className="img-fluid" alt="" />
            </div>
            <div className="urip_cated_caps">
              <h3 className="cats_urip_title"><a href="https://themezhub.net/live-pecozo/pecozo/index.html#">shopify</a></h3>
              <span>10k Items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default CategorySection