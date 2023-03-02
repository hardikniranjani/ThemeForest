import React from 'react';
import NavHeader from '../../shared/NavHeader';
import Filter from '../../Components/Common/Filter.jsx';
import ItemCount from '../../Components/Common/ItemCount';
import ItemSearchCard from '../../Components/Items/ItemSearchCard.jsx';

function SearchProducts() {
    return (
        <>
            <NavHeader />
            <section class="gray-light">
                <div class="container">
                    <div class="row">
                        <Filter />
                        <div class="col-lg-8 col-md-12 col-sm-12">
                            <ItemCount />
                            <ItemSearchCard />
                            <ItemSearchCard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchProducts