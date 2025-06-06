import React, { useState } from 'react';

const ContentTracker = () => {
  const [allData, setAllData] = useState([
    {
      id: 1,
      artist: "BIZZY",
      title: "ANYBODY",
      platform: "TikTok",
      datePosted: "2025-05-26",
      songUsed: "ANYBODY",
      fileName: "BIZZY ANYBODY LIVE 1",
      videoUrl: "https://tiktok.com/@bizzy/video/123",
      downloadLink: "https://drive.google.com/file/123",
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
      videoUrl: "https://tiktok.com/@bizzy/video/456",
      downloadLink: "https://drive.google.com/file/789",
      shares: 425,
      comments: 60,
      likes: 2400,
      views: 98000,
      performanceScore: 0.0271,
      addedToAds: true
    }
  ]);

  const [showAdmin, setShowAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const toggleAdsStatus = (id) => {
    setAllData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, addedToAds: !item.addedToAds } : item
      )
    );
  };

  const addNewItem = (newItem) => {
    const id = Math.max(...allData.map(item => item.id)) + 1;
    setAllData(prevData => [...prevData, { ...newItem, id }]);
    setShowAddForm(false);
  };

  const updateItem = (updatedItem) => {
    setAllData(prevData => 
      prevData.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setEditingItem(null);
  };

  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setAllData(prevData => prevData.filter(item => item.id !== id));
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const EditForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item || {
      artist: '',
      title: '',
      platform: 'TikTok',
      datePosted: new Date().toISOString().split('T')[0],
      songUsed: '',
      fileName: '',
      videoUrl: '',
      downloadLink: '',
      shares: 0,
      comments: 0,
      likes: 0,
      views: 0,
      addedToAds: false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const score = ((formData.likes + formData.comments + formData.shares) / formData.views).toFixed(4);
      onSave({ ...formData, performanceScore: parseFloat(score) });
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            {item ? 'Edit Content' : 'Add New Content'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Artist</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.artist}
                  onChange={(e) => setFormData({...formData, artist: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Title</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Platform</label>
                <select
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                >
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Song Used</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.songUsed}
                  onChange={(e) => setFormData({...formData, songUsed: e.target.value})}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>File Name</label>
              <input
                type="text"
                required
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                value={formData.fileName}
                onChange={(e) => setFormData({...formData, fileName: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Date Posted</label>
              <input
                type="date"
                required
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                value={formData.datePosted}
                onChange={(e) => setFormData({...formData, datePosted: e.target.value})}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Views</label>
                <input
                  type="number"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.views}
                  onChange={(e) => setFormData({...formData, views: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Likes</label>
                <input
                  type="number"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.likes}
                  onChange={(e) => setFormData({...formData, likes: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Comments</label>
                <input
                  type="number"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Shares</label>
                <input
                  type="number"
                  required
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                  value={formData.shares}
                  onChange={(e) => setFormData({...formData, shares: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Video URL</label>
              <input
                type="url"
                required
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                placeholder="https://tiktok.com/@user/video/123"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'medium', marginBottom: '4px' }}>Google Drive Link</label>
              <input
                type="url"
                required
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px' }}
                value={formData.downloadLink}
                onChange={(e) => setFormData({...formData, downloadLink: e.target.value})}
                placeholder="https://drive.google.com/file/123"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="addedToAds"
                checked={formData.addedToAds}
                onChange={(e) => setFormData({...formData, addedToAds: e.target.checked})}
              />
              <label htmlFor="addedToAds" style={{ fontSize: '14px', fontWeight: 'medium' }}>
                Added to Ads
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 'medium',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  flex: 1,
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 'medium',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Performance Tracker</h1>
            <p className="text-gray-600">Track organic content performance across artists and platforms</p>
          </div>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: 'medium',
              cursor: 'pointer'
            }}
          >
            ⚙️ Admin Panel
          </button>
        </div>

        {showAdmin && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 'medium',
                  cursor: 'pointer'
                }}
              >
                ➕ Add New Content
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Title</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Artist</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Platform</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Views</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Score</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Ads</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '8px' }}>{item.title}</td>
                      <td style={{ padding: '8px' }}>{item.artist}</td>
                      <td style={{ padding: '8px' }}>{item.platform}</td>
                      <td style={{ padding: '8px' }}>{formatNumber(item.views)}</td>
                      <td style={{ padding: '8px' }}>{item.performanceScore.toFixed(4)}</td>
                      <td style={{ padding: '8px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: item.addedToAds ? '#dcfce7' : '#f3f4f6',
                          color: item.addedToAds ? '#166534' : '#374151'
                        }}>
                          {item.addedToAds ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => setEditingItem(item)}
                            style={{
                              color: '#2563eb',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            style={{
                              color: '#dc2626',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allData.map((item) => (
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
                    onChange={() => toggleAdsStatus(item.id)}
                    className="w-4 h-4 text-green-600"
                  />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">
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

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <span className="text-gray-500">Posted:</span>
                  <span className="font-medium ml-1">{new Date(item.datePosted).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '12px'
                    }}
                  >
                    View Video
                  </a>
                  
                    href={item.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      border: '1px solid #d1d5db',
                      color: '#374151',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '12px'
                    }}
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingItem && (
        <EditForm 
          item={editingItem} 
          onSave={updateItem} 
          onCancel={() => setEditingItem(null)} 
        />
      )}

      {showAddForm && (
        <EditForm 
          item={null} 
          onSave={addNewItem} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
    </div>
  );
};

export default ContentTracker;
