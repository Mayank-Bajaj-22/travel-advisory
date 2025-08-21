import React, { useEffect } from 'react';

const PlaceDetails = ({ place, selected, refProp }) => {
  useEffect(() => {
    if (selected) {
      refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected, refProp]);
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img
        className="w-full h-[350px] object-cover"
        src={
          place.photo
            ? place.photo.images.large.url
            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        }
        alt={place.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{place.name}</h2>

        <div className="flex justify-between items-center my-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐ {place.rating}</span>
          </div>
          <p className="text-sm text-gray-600">
            {place.num_reviews} review{place.num_reviews > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700 font-medium">Price</span>
          <span className="text-gray-600">{place.price_level || 'N/A'}</span>
        </div>

        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-700 font-medium">Ranking</span>
          <span className="text-gray-600">{place.ranking}</span>
        </div>

        {place?.awards?.map((award, index) => (
          <div
            key={index}
            className="flex items-center justify-between my-2 space-x-2"
          >
            <img src={award.images.small} alt="award" />
            <span className="text-sm text-gray-500">{award.display_name}</span>
          </div>
        ))}

        <div className="flex flex-wrap gap-2 mb-3">
          {place?.cuisine?.map(({ name }) => (
            <span
              key={name}
              className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded"
            >
              {name}
            </span>
          ))}
        </div>

        {place.address && (
          <p className="flex items-center text-sm text-gray-600 mb-2">
            📍 {place.address}
          </p>
        )}

        {place.phone && (
          <p className="flex items-center text-sm text-gray-600">
            📞 {place.phone}
          </p>
        )}
      </div>

      <div className="flex gap-4 px-4 pb-4">
        <a
          href={place.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline"
        >
          Trip Advisor
        </a>
        {place.website && (
          <a
            href={place.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline"
          >
            Website
          </a>
        )}
      </div>
    </div>
  );
};

export default PlaceDetails;
