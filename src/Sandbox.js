import React from "react";


const Sandbox = () => {
  return (
    <>
      <h1>SANDBOX</h1>
      <Table/>
    </>
  )
}


const Table = () => {
  const tabs1 = [
    {header: 'tab1', content: 'tab-content 1'},
    {header: 'tab2', content: 'tab-content 2'},
    {header: 'tab3', content: 'tab-content 3'},
    {header: 'tab4', content: 'tab-content 4'},
    {header: 'tab5', content: 'tab-content 5'}
  ]

  const tabs2 = [
    {header: 'tab1', content: 'tab-content 1'},
    {header: 'tab2', content: 'tab-content 2'},
    {header: '567', content: 'tab-content 3'},
    {header: '567567', content: 'tab-content 4'},
    {header: 'tab5', content: 'tab-content 5'}
  ]

  const tabs3 = [
    {header: '34546', content: 'tab-content 1'},
    {header: '4565765', content: 'tab-content 2'},
    {header: '567657', content: 'tab-content 3'},
    {header: '57567', content: 'tab-content 4'},
    {header: '567567', content: 'tab-content 5'}
  ]


  return (
    <>
      <Tabs tabs={tabs1}/>
      <br/>
      <Tabs tabs={tabs2}/>
      <br/>
      <Tabs tabs={tabs3}/>
    </>
  )
}

const Tabs = (props) => {
  console.log('PROPS Tabs', props)

  const handleClick = (e, value) => {

    if (e.target.tagName === 'LI') {
      console.log(e.target.textContent)
      e.target.textContent = value || 'default'
    }
  }

  return (
    <ol onClick={(e) => handleClick(e, 'Custom')}>
      {props.tabs.map((item, idx) => <li key={Math.random()}>{item.header}</li>)}
    </ol>
  )
}


export default Sandbox