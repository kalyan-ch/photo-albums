import { FaTrash } from "react-icons/fa";
import { useDeletePhotoMutation } from "../store";

const PhotoListItem = ({ photo }) => {
  const [deletePhoto] = useDeletePhotoMutation();

  const handleDeletePhoto = () => {
    deletePhoto(photo.id);
  }

  return (
    <div className="relative m-2 cursor-pointer" onClick={handleDeletePhoto}>
      <img className="h-30 w-30" src={photo.url} alt={photo.id} />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <FaTrash className="text-4xl" />
      </div>
    </div>
  );
};

export default PhotoListItem;
