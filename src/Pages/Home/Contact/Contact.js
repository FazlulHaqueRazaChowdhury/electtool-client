import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';


const handleSend = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const message = event.target.message.value;
    const info = {
        email: email,
        message: message
    }
    axios.post('https://arcane-reaches-97312.herokuapp.com/email', info)
        .then(res => {
            console.log(res);
            toast.success(res.data.message)
        });
}
const Contact = () => {
    return (
        <div>
            <div className="hero min-h-[50vh] mb-[100px] relative" style={{
                backgroundImage: 'url(https://i.ibb.co/N9xkm3C/chad-kirchoff-xe-e69j6-Ds-unsplash.jpg)'
            }}>
                <div className="hero-content flex-col lg:flex-row-reverse container mx-auto z-30 text-white">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Need Help?</h1>
                        <p className="py-6">Tell Us ! We will reply you in 24 hours. Or read the FAQ to solve your problem or call to customer care no given on the footer.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSend}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Email*</span>
                                    </label>
                                    <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Message*</span>
                                    </label>
                                    <textarea placeholder="Your Message" name='message' className="textarea textarea-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Send</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className='bg-gradient-to-r from-primary to-secondary min-h-[100%] w-full contact absolute' style={{
                    opacity: .8
                }}>
                </div>
            </div>
        </div>
    );
};

export default Contact;