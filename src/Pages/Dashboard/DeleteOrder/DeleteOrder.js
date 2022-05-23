import React from 'react';

const DeleteOrder = ({ data, refetch }) => {
    const handleDelete = id => {

    }

    return (
        <div>
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-4" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">Are you sure to delete {data?.prodcutName}</h3>
                    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                </div>
            </div>
        </div >
    );
};

export default DeleteOrder;