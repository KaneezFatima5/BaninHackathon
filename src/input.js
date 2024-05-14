import React, { useState } from "react";
import Replicate from "replicate";

const REPLICATE_API_TOKEN = "r8_FNF0RwCjkgelhXnjoeR1Rh7NivAp5jF3lMjFi";

if (!REPLICATE_API_TOKEN) {
    console.error("REPLICATE_API_TOKEN is not set.");
    process.exit(1);
}

function Input(){
    
    const [prompt, setPrompt] =useState('');
    const [scheduler, setScheduler]= useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const replicate= new Replicate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const input = {
                prompt,
                scheduler
            };
            const output = await replicate.run("stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", { input });
            setImageUrl(output[0]);
            console.log(output[0])
        } catch (error) {
            console.error('Error generating image:', error);
        }
        setLoading(false);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    return(
        <div id="inputSection">
        <form id="input" onSubmit={handleSubmit}>
            <h1 >Generate Your Image</h1>
  <div className="form-group" >
    <label for="exampleInputEmail1">Input</label>
    <input type="text" className="form-control" id="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Enter your text" />
    <small id="emailHelp" className="form-text text-muted">You can convert your words in to an image. Just Imagine</small>
  </div>
  <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
</form>
{loading && <p>Loading...</p>}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={imageUrl} alt="Generated Image" />
                    </div>
                </div>
            )}
        </div>
    );
}
export default Input;