import React from 'react'
import FullHeaderContain from '../containers/FullHeaderContain'

const App = ({children}) => (
	
	<div>
		<FullHeaderContain />
		{children}
	</div>
);

export default App;