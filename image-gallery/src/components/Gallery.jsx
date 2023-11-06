import './Gallery.css'
import imagesData from '../imagesData';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const Gallery = () => {
   const [images, setImages] = useState(imagesData);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImages = Array.from(images);
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(updatedImages);
  };

  const handleDelete = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
  };

  const handleSetFeatureImage = (id) => {
    const updatedImages = images.map((image) => ({
      ...image,
      isFeatured: image.id === id,
    }));
    setImages(updatedImages);
  };
    return (
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided) => (
          <div className="image-gallery" {...provided.droppableProps} ref={provided.innerRef}>
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`image ${image.isFeatured ? 'featured' : ''}`}
                  >
                    <img src={image.url} alt={`Image ${image.id}`} />
                    <div className="controls">
                      <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </div>
                    <div className="feature-controls">
                      <button onClick={() => handleSetFeatureImage(image.id)}>
                        Set Feature
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    );
};

export default Gallery;