import React, { useState } from 'react';

const ContentTracker = () => {
  const [data] = useState([
    {
      id: 1,
      artist: "BIZZY",
      title: "ANYBODY",
      platform: "TikTok",
      datePosted: "2025-05-26",
      songUsed: "ANYBODY",
      fileName: "BIZZY ANYBODY LIVE 1",
      shares: 6,
      comments: 24,
      likes: 364,
      views: 5829,
      performanceScore: 0.0738,
      addedToAds: false
    },
    {
      id: 2,
      artist: "BIZZY",
      title: "TUESDAY",
      platform: "TikTok",
      datePosted: "2025-05-04",
      songUsed: "TUESDAY",
      fileName: "BIZZY TUESDAY CONFIDENCE",
      shares: 425,
      comments: 60,
      likes: 2400,
      views: 98000,
      performanceScore: 0.0271,
      addedToAds: true
    }
  ]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Performance Tracker</h1>
          <p className="text-gray-600">Track organic content performance across artists and platforms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl shadow-sm border p-6 transition-all duration-200 ${
                item.addedToAds 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.addedToAds}
                    readOnly
                    className="w-4 h-4 text-green-600"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Added to Ads
                  </label>
                </div>
                {item.addedToAds && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ✓ In Ads Market
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.songUsed}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.fileName}</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{item.artist}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-black text-white">
                    {item.platform}
                  </span>
                  <div className="text-lg font-bold text-blue-600">
                    {item.performanceScore.toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{formatNumber(item.views)}</div>
                  <div className="text-xs text-gray-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{formatNumber(item.likes)}</div>
                  <div className="text-xs text-gray-600">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{formatNumber(item.comments)}</div>
                  <div className="text-xs text-gray-600">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{formatNumber(item.shares)}</div>
                  <div className="text-xs text-gray-600">Shares</div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <span className="text-gray-500">Posted:</span>
                <span className="font-medium ml-1">{new Date(item.datePosted).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTracker;
