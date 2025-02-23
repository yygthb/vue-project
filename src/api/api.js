import { BASE64_IMG_1, BASE64_IMG_2, BASE64_IMG_3, BASE64_IMG_4, BASE64_IMG_5 } from "./db_img"

function fetchImages() {
  return [BASE64_IMG_1, BASE64_IMG_2, BASE64_IMG_3, BASE64_IMG_4, BASE64_IMG_5];
}

export {
  fetchImages,
};
