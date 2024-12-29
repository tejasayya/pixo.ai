

const ImageGenerator = () => {
  return (
    <div className="max-w-screen-xl px-5 mx-auto mt-12">
        <div className="grid items-center gap-8 p-10 border-2 border-purple-900 rounded-lg bg-gray-600/30 lg:grid-cols-2">
            {/* options */}
            <form action="">
                {/* Prompt */}
                <div className="mb-7">

                    <label htmlFor="prompt" className="form-label">Prompt</label>

                    <textarea name="" id="prompt" rows="4" required className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500" ></textarea>
            
                </div>

                {/* Image style */}
                <div className="mb-7">
                    <label htmlFor="style" className="form-label">
                        Image Style
                    </label>

                    <select name="" id="style" className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500">
                        <option value="anime">Anime</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="photographic">Photographic</option>
                        <option value="neon-punk">Neon Punk</option>
                        <option value="3d-model">3D Model</option>

                    </select>

                </div>

            </form>




            {/* Generated Image TODO */}
            <div className="grid content-center border-2 border-purple-900 rounded-md mx-auto lg:ms-auto overflow-clip w-[500px] h-[500px]">
                <p className="text-center">
                    Generated IMG
                </p>
            </div>

        </div>
    </div>
  )
}

export default ImageGenerator