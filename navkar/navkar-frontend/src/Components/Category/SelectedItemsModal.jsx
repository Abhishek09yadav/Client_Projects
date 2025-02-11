import React from 'react';
import {Modal} from 'react-bootstrap';

const SelectedItemsModal = ({isModalOpen, setIsModalOpen, selectedProducts, allProducts}) => {
    return (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Header closeButton>
                <Modal.Title className={'text-black'}>Selected Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.keys(selectedProducts).length === 0 ? (
                    <p className={'text-black'}>No items selected.</p>
                ) : (
                    <ul>
                        {Object.keys(selectedProducts).map((productId) => {
                            const product = allProducts.find(
                                (item) => item.id === Number(productId) || item._id === productId
                            );
                            if (!product) return null;

                            return (
                                <li className={'text-black'} key={productId}>
                                    {product.name} - Quantity: {selectedProducts[productId].quantity}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>*/}
            {/*        Close*/}
            {/*    </Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    );
};

export default SelectedItemsModal;