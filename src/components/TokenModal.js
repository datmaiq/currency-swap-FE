import React, { useState } from "react";

const TokenModal = ({
  isOpen,
  onClose,
  onSelectToken,
  tokenImages,
  prices,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredTokens = Object.keys(prices).filter((token) =>
    token.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-2xl shadow-lg min-h-96 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-purple-500  font-bold">Select a Token</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <input
          type="text"
          placeholder="Search token"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-pink-bg  p-2 border border-purple-300 rounded mb-4"
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredTokens.map((token) => (
            <li
              key={token}
              onClick={() => onSelectToken(token)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={tokenImages[token]}
                alt={token}
                className="w-6 h-6 mr-2"
              />
              {token.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TokenModal;
