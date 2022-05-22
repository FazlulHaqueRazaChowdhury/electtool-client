import React from 'react';
import { BsTruck } from 'react-icons/bs'
import { Ri24HoursLine } from 'react-icons/ri'
import { GiReturnArrow } from 'react-icons/gi'
import { MdOutlineLocalOffer } from 'react-icons/md'
const Policy = ({ policy }) => {
    const { id, name, desc } = policy;
    const truck = <BsTruck className='text-7xl' />;
    const online = <Ri24HoursLine className='text-7xl' />;
    const money = <GiReturnArrow className='text-7xl' />;
    const member = <MdOutlineLocalOffer className='text-7xl' />;
    return (
        <div>

            <div class="card bg-base-100 ">
                <div class="card-body">
                    <div className="flex gap-x-[14px]">
                        {
                            id === 1 ? truck : id === 2 ? online : id === 3 ? money : id === 4 ? member : ''
                        }
                        <div className="text-part">
                            <h1 className='text-2xl font-bold'>{name.toUpperCase()}</h1>
                            <p className='font'>{desc}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Policy;