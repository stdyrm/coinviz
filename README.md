## **Coin Viz tools**
### **Coin Quote**
Input cryptocurrency transactions from past dates to calculate total and weighted average costs, and profit/loss. Individual transactions are recorded separately in a table.

### **24Hr volume chart**
Shows cryptocurrency-fiat volume from the past 24 hours. Quick reference to compare fiat volumes (in fiat volume) for various cryptocurrencies.

#### **Data sources**
All data is provided through [CryptoCompare's API](https://www.cryptocompare.com).
Because the data is aggregated, and doesn't take exchange fees, etc. into account, it is not inteded to replace users' actual transaction records. The tool helps users visualize profit/loss.

##### **Directory**
/src
	/app24hourVol
		/charts
			/Bars24Hr.js
			/Chart24Hr.js
			/Labels24Hr.js
		/data
			/getApiData.js
		App24HourVol.js
		appParams.js


	/appCoinQuote
		/charts
			/BarsAggregated.js
			/ChartAggregated.js
			/LabelsAggregated.js
		/data
			/aggregateTransactions.js
			/convertToReadable.js
			/getApiData.js
		/inputs
			/InputActionButtons.js
			/InputDate.js
			/InputUnits.js
			/TransactionCard.js
		/interface
			/AggregatedCard.js
			/AggregatedCardList.js
			/TransactionTable.js
		AppCoinQuote.js
		appParams.js
		index.js

	/sharedComponents
		/charts
			/Bars.js
			/Overlay.js
			/index.js
		/navigation
			/AppMenuList.js
			/AppTitle.js
			/Navbar.js
			/ParamDrawer.js
			/ParamDrawerSection.js
			/index.js
		/settings
			/Settings.js
			/index.js
		
	/sharedResources
		/context
			/ThemeContext.js
		/reference
			/currencies.js
			/requestParams.js
		/style
			/poppins
			/colors.js
			/styles.css
			/theme.js
		/util

	App.js
	index.js
