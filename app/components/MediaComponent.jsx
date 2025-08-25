import React from 'react';
import {Image} from '@shopify/hydrogen';
function MediaComponent({data}) {
  console.log(data);
  if (data?.__typename == 'Video') {
    console.log('test');
    console.log('Rendering video');
    return (
      <div className="overflow-hidden rounded-xl">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          className="w-full h-full object-cover"
          aria-label="Background video"
        >
          {data.sources.map((source, index) => (
            <source key={index} src={source.url} type={source.mimeType} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl h-full">
      <Image
        data={data.image}
        sizes="(min-width: 45em) 50vw, 100vw"
        className="w-full h-full object-cover"
      ></Image>
    </div>
  );
}

export default MediaComponent;
