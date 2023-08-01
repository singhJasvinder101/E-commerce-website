// to avoid use same thing in both pages of create and edit product in component.jsx files
import axios from "axios";


export const uploadImageApiRequest = async (images, productId) => {
    const formData = new FormData()

    Array.from(images).forEach(image => {
        formData.append("images", image)
    })
    const { data } = await axios.post(`/api/products/admin/upload?productId=${productId}`, formData)
    return data;
}

export const uploadImagesCloudinaryApiRequest = (images, productId) => {
    const url = 'https://api.cloudinary.com/v1_1/dfdmyewjs/image/upload';
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset", "v9kjru9j");
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                axios.post(`/api/products/admin/upload?cloudinary=true&productId=${productId}`, data)
                    // this data from cloudinary goes as post request which we can access through req.body.url for images
                    .then(() => {
                        // console.log("Image uploaded to Cloudinary and product updated.", data);
                        res.send("Image uploaded to Cloudinary and product updated.");
                    })
                    .catch((error) => {
                        next(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

