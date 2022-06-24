import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../../api/axiosPrivate';

const Address = ({ address }) => {

    return (
        <div>
            {
                address?.street + ',' + address?.city + ',' + address?.zip + ',' + address?.country + '.'
            }
        </div>
    );
};

export default Address;