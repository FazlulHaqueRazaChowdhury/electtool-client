import React from 'react';
import Policy from './Policy';

const CompanyPolicy = () => {

    const policyData = [
        { id: 1, name: 'FREE DELIVERy', desc: 'Get Free Deliever on minimum 200 orders' },
        { id: 2, name: 'ONLINE 24/7', desc: 'Our customer service is open 24/7' },
        { id: 3, name: 'MONEY RETURN', desc: '7 Days Money Return' },
        { id: 4, name: 'MEMBERSHIP', desc: 'Get your membership to have 25% off' },
    ]
    return (
        <div className='container mx-auto'>
            <div className="grid grid-cols-1 lg:grid-cols-4">
                {
                    policyData.map(policy => <Policy policy={policy} />)
                }
            </div>
        </div>
    );
};

export default CompanyPolicy;