import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import PhotoListItem from "./PhotoListItem";
import Skeleton from "./Skeleton";

const PhotoList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album.id);
  const [addPhoto, addResults] = useAddPhotoMutation();
  const handleAddPhoto = () => {
    addPhoto(album.id);
  };

  let content;

  if (isFetching) {
    content = <Skeleton className="h-8 w-full" numBoxes={3} />;
  } else if (error) {
    content = <div>Error fetching pics bruh</div>;
  } else {
    content = data.map((pic) => {
      return <PhotoListItem key={pic.id} photo={pic} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-base">Photos in {album.title}</h3>
        <Button
          loading={addResults.isLoading}
          outline
          primary
          onClick={handleAddPhoto}
        >
          Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
};

export default PhotoList;
