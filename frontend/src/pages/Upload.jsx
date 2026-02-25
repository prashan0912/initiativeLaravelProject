import axios from "axios";
import { useState } from "react";

function Upload() {
    const [image, setImage] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "your_preset_name");

        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/prashantsahu0912/image/upload",
            
            formData
        );

        console.log(res.data.secure_url);
    };

    return (
        <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default Upload;