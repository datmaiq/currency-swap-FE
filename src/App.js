import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import loadTokenImages from "./loadTokenImages";
import TokenModal from "./components/TokenModal";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import ErrorAlert from "./components/ErrorAlert";
import logo99Tech from "./assets/logo/99Tech.png";
import { PRICE_API_ENDPOINT } from "./config/config";
const App = () => {
  // State management for various data and UI states
  const [prices, setPrices] = useState({});
  const [fromToken, setFromToken] = useState("wbtc");
  const [toToken, setToToken] = useState("busd");
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [tokenImages, setTokenImages] = useState({});
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setIsToTokenModalOpen] = useState(false);
  const [recentSwap, setRecentSwap] = useState({ token: "busd", amount: 0 });
  const [isSwapping, setIsSwapping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Fetch prices and load images on component mount
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(PRICE_API_ENDPOINT);
        const pricesData = response.data.reduce((acc, token) => {
          if (token.price > 0) {
            acc[token.currency.toLowerCase()] = token.price;
          }
          return acc;
        }, {});
        setPrices(pricesData);

        const validTokens = response.data
          .filter((token) => token.price > 0)
          .map((token) => token.currency.toLowerCase());
        const images = loadTokenImages(validTokens);
        setTokenImages(images);
      } catch (error) {
        setErrorMessage("Failed to fetch token prices.");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    };

    fetchPrices();
  }, []);

  // Memoized callback to update Amount
  useEffect(() => {
    if (prices[fromToken] && prices[toToken]) {
      setToAmount(
        Number(((fromAmount * prices[fromToken]) / prices[toToken]).toFixed(1))
      );
    }
  }, [prices, fromToken, toToken, fromAmount]);

  const updateToAmount = useCallback(
    (fromAmount) => {
      if (prices[fromToken] && prices[toToken]) {
        setToAmount(
          Number(
            ((fromAmount * prices[fromToken]) / prices[toToken]).toFixed(5)
          )
        );
      }
    },
    [prices, fromToken, toToken]
  );

  const updateFromAmount = useCallback(
    (toAmount) => {
      if (prices[fromToken] && prices[toToken]) {
        setFromAmount(
          Number(((toAmount * prices[toToken]) / prices[fromToken]).toFixed(5))
        );
      }
    },
    [prices, fromToken, toToken]
  );

  // Handle change input, output
  const handleFromAmountChange = useCallback(
    (e) => {
      let value = e.target.value;

      // Allow only numeric values and a single decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        setFromAmount(value);

        // Update toAmount only if value is a valid number
        if (value !== "") {
          updateToAmount(parseFloat(value) || 0);
        }
      }
    },
    [updateToAmount]
  );

  const handleToAmountChange = useCallback(
    (e) => {
      let value = e.target.value;

      // Allow only numeric values and a single decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        setToAmount(value);

        // Update fromAmount only if value is a valid number
        if (value !== "") {
          updateFromAmount(parseFloat(value) || 0);
        }
      }
    },
    [updateFromAmount]
  );

  // Handle token select change
  const handleFromTokenChange = useCallback((token) => {
    setFromToken(token);
    setIsFromTokenModalOpen(false);
  }, []);

  const handleToTokenChange = useCallback((token) => {
    setToToken(token);
    setIsToTokenModalOpen(false);
  }, []);

  // Handle token swap
  const handleSwap = useCallback(() => {
    if (fromAmount === 0 || toAmount === 0) {
      setErrorMessage("Amount must be greater than zero.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (prices[fromToken] && prices[toToken]) {
      setIsSwapping(true);

      setTimeout(() => {
        setRecentSwap({ token: toToken, amount: toAmount });
        setIsSwapping(false);
        setNotificationMessage("Swap successful!");
        setTimeout(() => setNotificationMessage(""), 3000);
      }, 1000);
    } else {
      setErrorMessage("Invalid token prices for swap.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }, [prices, fromToken, toToken, fromAmount, toAmount]);

  // Get token image based on token symbol
  const getTokenImage = useCallback(
    (symbol) => {
      return tokenImages[symbol.toLowerCase()] || "";
    },
    [tokenImages]
  );

  // Determine if the swap button should be disabled
  const isSwapDisabled = !prices[fromToken] || !prices[toToken] || isSwapping;

  return (
    <div className="relative min-h-screen bg-99-bg bg-cover bg-center">
      <Navbar recentSwap={recentSwap} getTokenImage={getTokenImage} />

      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full md:w-1/2 lg:w-1/3 mx-auto py-5 rounded-2xl shadow-lg bg-white mt-6">
          <h3 className="text-purple-500 font-kanit px-5 font-extrabold leading-6 text-xl text-start">
            99Tech Swap
          </h3>

          <h5 className="text-gray-500 font-kanit pb-5 mt-1 mb-5 px-5 font-bold leading-6 text-sm text-start border-b-2">
            Be part of the future of marketing
          </h5>
          <div className="flex flex-col space-y-4 px-5">
            <div className="flex flex-col items-start">
              <button
                onClick={() => setIsFromTokenModalOpen(true)}
                className="p-2 rounded bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-2xl font-bold mb-2  flex items-center justify-center hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={getTokenImage(fromToken)}
                  alt={fromToken}
                  className="w-6 h-6 mr-2 inline-block"
                />
                {fromToken.toUpperCase()}
              </button>
              <input
                type="text"
                value={fromAmount}
                onChange={handleFromAmountChange}
                className="p-2 bg-pink-bg h-12 md:h-20 border rounded-2xl w-full text-end"
              />
            </div>
            <div className="flex flex-col items-start">
              <button
                onClick={() => setIsToTokenModalOpen(true)}
                className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-2xl mb-2  flex items-center justify-center hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={getTokenImage(toToken)}
                  alt={toToken}
                  className="w-6 h-6 mr-2 inline-block"
                />
                {toToken.toUpperCase()}
              </button>
              <input
                type="text"
                value={toAmount}
                onChange={handleToAmountChange}
                className="p-2 bg-pink-bg h-12 md:h-20 border rounded-2xl w-full text-end"
              />
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleSwap}
                className="px-8 w-full py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-2xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                disabled={isSwapDisabled}
              >
                {isSwapping ? "Swapping..." : "Swap Token"}
              </button>
            </div>
          </div>
          <TokenModal
            isOpen={isFromTokenModalOpen}
            onClose={() => setIsFromTokenModalOpen(false)}
            onSelectToken={handleFromTokenChange}
            tokenImages={tokenImages}
            prices={prices}
          />
          <TokenModal
            isOpen={isToTokenModalOpen}
            onClose={() => setIsToTokenModalOpen(false)}
            onSelectToken={handleToTokenChange}
            tokenImages={tokenImages}
            prices={prices}
          />
        </div>
        {errorMessage && (
          <ErrorAlert
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        {notificationMessage && (
          <Notification
            message={notificationMessage}
            onClose={() => setNotificationMessage("")}
          />
        )}
      </div>

      <div className="flex items-center justify-end space-x-2 absolute bottom-24 right-4">
        <a
          href="https://www.99tech.co/"
          className="flex items-center bg-purple-500 text-white px-4 py-4 rounded-2xl shadow-lg"
        >
          <div className="font-bold">Need help?</div>
        </a>
        <div className="relative">
          <img src={logo99Tech} className="h-14" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default App;
