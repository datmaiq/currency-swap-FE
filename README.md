# Currency Swap Project

![Demo Image](src/assets/background/demo.png)

## Overview

Welcome to the Currency Swap project! This coding challenge, created for Tech 99, demonstrates a feature to swap tokens with exchange rates. I developed this project to showcase my skills and passion for joining Tech 99.

### Important Note

- **Static Data:** The data from this API has not changed in over a year, meaning it is static and does not reflect real-time price changes.
- **Fetch Once:** Due to the static nature of the data, the application only fetches the prices once during the initial load.
- **Decimal Precision:** In the field of cryptocurrency, values often have many decimal places. To ensure accurate calculations and display, the application uses 5 decimal places for USD values and cryptocurrency prices. This level of precision is crucial to accurately represent and process small fluctuations in cryptocurrency prices, similar to the precision used by platforms like PancakeSwap. By maintaining high decimal precision, we ensure that users receive the most accurate financial information possible.

## Considerations for Real-Time Data

If the token prices were to change frequently, the application should fetch the latest prices whenever the user enters an input or initiates a swap. This can be done by moving the price-fetching logic into the relevant event handlers:

```javascript
const fetchLatestPrices = async () => {
  try {
    const response = await axios.get(
      "https://interview.switcheo.com/prices.json"
    );
    const pricesData = response.data.reduce((acc, token) => {
      if (token.price > 0) {
        acc[token.currency.toLowerCase()] = token.price;
      }
      return acc;
    }, {});
    setPrices(pricesData);
  } catch (error) {
    setErrorMessage("Failed to fetch token prices.");
    setTimeout(() => setErrorMessage(""), 3000);
  }
};

const handleFromAmountChange = useCallback(
  async (e) => {
    await fetchLatestPrices();
    let value = e.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
      if (value !== "") {
        updateToAmount(parseFloat(value) || 0);
      }
    }
  },
  [updateToAmount]
);
```

### Token Swap Features

**1. Select Token via Modal:**

- Users can select tokens for the transaction through a modal. The modal will display a list of available tokens and allow users to choose from the list.

**2. Display Token Conversion Rate:**

- After selecting tokens, the system will show the conversion rate between the chosen tokens. The conversion rate will be updated instantly and clearly for easy tracking by the user.

**3. Swap Token:**

- When the user performs a swap, the number of tokens will be saved and updated in the system. The interface will display the amount of tokens swapped along with images of the token types.

**4. Get Help Link:**

- To provide additional support, a "Get Help" link will direct users to the [99tech](https://www.99tech.co/) website. This page offers useful information and guidance related to using the token swap application.

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/datmaiq/code-challenge.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd currency-swap
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```

## Technologies Used

- **Tailwind CSS:** Styling the application.
- **axios:** HTTP client for making API requests.
