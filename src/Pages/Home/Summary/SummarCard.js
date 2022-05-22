import React from 'react';
import { MdAttachMoney } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
const SummarCard = ({ summary }) => {
    const { name, quantity, id } = summary;
    const money = <MdAttachMoney className='text-6xl text-primary ' />;
    const customer = <FaUsers className='text-6xl text-primary' />;
    const review = <AiOutlineMessage className='text-6xl text-primary' />;
    return (
        <div>
            <div class="card lg:w-96 mx-auto bg-base-100">
                <div class="card-body">
                    <h2 class="card-title font-semi text-3xl">{name}</h2>
                    <div className="flex items-center">
                        {
                            id === 1 ? money : id === 2 ? customer : id === 3 ? review : ''
                        }
                        <div className="quantity text-5xl font-bold lg:ml-[10px]">
                            {
                                quantity
                            }
                            {
                                id === 1 && 'M'
                            }+
                        </div>
                    </div>

                </div>
            </div>




        </div>
    );
};

export default SummarCard;