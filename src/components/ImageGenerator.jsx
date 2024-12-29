import { useState } from "react"
import axios from "axios"


const ImageGenerator = () => {

    const [payload, setPayload] = useState({
        prompt: "",
        aspect_ratio: "1:1",
        seed: "5",
        style_preset: "anime",
        output_format: "png"
    });
    const [imageSrc, setImageSrc] = useState(null);

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prevPayload) => ({
            ...prevPayload,
            [name]: value,
        }));
    };

    //form submit handler
    const formSubmitHandler = async (e) =>{
        e.preventDefault();
        console.log("Request Sent", payload);

        setImageSrc(null);

        try{
            const response = await axios.get(`https://image.pollinations.ai/prompt/{${payload.prompt}}`, { responseType: "arraybuffer" });
            console.log("try block2")
            console.log(response);
            if(response.status === 200){
                console.log("success");
                const contentType = response.headers['content-type'] || 'image/jpeg';
                const blob = new Blob([response.data], { type: contentType});
                
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch(error) {
            console.error("Error Generating Image", error);
        }
    }

  return (
    <div className="max-w-screen-xl px-5 mx-auto mt-12">
        <div className="grid items-center gap-8 p-10 border-2 border-purple-900 rounded-lg bg-gray-600/30 lg:grid-cols-2">
            {/* options */}
            <form action="" onSubmit={formSubmitHandler}>
                {/* Prompt */}
                <div className="mb-7">

                    <label htmlFor="prompt" className="form-label">Prompt</label>

                    <textarea 
                    id="prompt" 
                    name="prompt" 
                    value={payload.prompt} 
                    onChange={handleChange} 
                    placeholder="A car on sea" 
                    rows="4" required className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500" ></textarea>
            
                </div>

                {/* Image style */}
                <div className="mb-7">
                    <label htmlFor="style" className="form-label">
                        Image Style
                    </label>

                    <select name="style_preset" value={payload.style_preset} onChange={handleChange} id="style" className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500">
                        <option value="anime">Anime</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="photographic">Photographic</option>
                        <option value="neon-punk">Neon Punk</option>
                        <option value="3d-model">3D Model</option>

                    </select>

                </div>

                {/* Image format */}
                <div className="mb-7">
                    <label htmlFor="format" className="form-label">
                        Image Format
                    </label>

                    <select name="output_format" onChange={handleChange} value={payload.output_format} id="format" className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500">
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                        <option value="webp">WEBP</option>
                                                
                    </select>
                </div>

                {/* button */}
                <button type="submit" className="block w-full p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600">
                    <span>⭐ Generate Image ✨</span>

                </button>

                {/* Made with ❤️ Teja Sayya */}
                <div className="text-center mt-6 p-4 border-t-2 border-purple-500">
                    <p className="text-lg text-gray-300 flex justify-center items-center">
                        Made with ❤️ by{" "}
                        <span className="font-semibold text-purple-500 flex items-center ml-2">
                            Teja Sayya
                            <img className="ml-2" width="35" height="35" src="ynb.png" alt="Teja Logo" />
                        </span>
                    </p>
                </div>


                {/* Social Links */}
                <div className="flex justify-center space-x-6 mt-4">
                <a
                    href="https://www.linkedin.com/in/teja-sayya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600"
                >
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a
                    href="https://github.com/tejasayya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-black"
                >
                    <i className="fab fa-github fa-2x"></i>
                </a>
                <a
                    href="https://huggingface.co/TejaSayya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500"
                >
                    <img width="35" height="35" src="https://img.icons8.com/fluency/48/hugging-face_app.png" alt="hugging-face_app"/>
                </a>
                <a
                    href="https://x.com/TejaSayya8222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400"
                >
                    <img className="bg-white rounded" width="35" height="35" src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="twitterx--v1"/>
                </a>
                </div>


            </form>




            {/* Generated Image TODO */}
            <div className="grid content-center border-2 border-purple-900 rounded-md mx-auto lg:ms-auto overflow-clip w-[500px] h-[500px]">
                {imageSrc ? ( <img className="mx-auto" src={imageSrc} /> ) : ( <p className="text-center">Loading...</p> )}
            </div>

        </div>
    </div>
  )
}

export default ImageGenerator