import { BASE64_IMG_1, BASE64_IMG_2, BASE64_IMG_3 } from "./db_img"

function fetchImages() {
  return [BASE64_IMG_1, BASE64_IMG_2, BASE64_IMG_3];
}

export {
  fetchImages,
};
