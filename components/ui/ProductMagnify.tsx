import { FC } from 'react';
import ReactImageMagnify from 'react-image-magnify';

import './ProductMagnify.module.css';


interface Props {
    images: string[];
}

export const ProductMagnify: FC<Props> = ({ images }) => {
    return (
        <div className="fluid">
            {images.map((image) => {
                const url = `/products/${image}`;
                return (
                    <div className="fluid__image-container" key={image}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: `Product ${image}`,
                                    isFluidWidth: true,
                                    src: url
                                },
                                largeImage: {
                                    src: url,
                                    width: 1200,
                                    height: 1800,
                                },
                                isHintEnabled: true,
                                enlargedImageContainerStyle: {
                                    zIndex: 1,
                                    position: 'absolute'
                                },
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};