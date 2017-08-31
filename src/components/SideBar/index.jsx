import React from 'react'
import { Label, Menu } from 'semantic-ui-react'
import style from './index.css'

const SideBar = ({ noReadNum_all, noReadNum_ithome, noReadNum_kr, noReadNum_ifanr, clickSwitchCategory, clickUnPop }) => (

    <div className={style.side}
        onClick={()=>clickUnPop()}
    >
        <div to="/" className={style.header}>
            <span>定悦</span>
        </div>

        <Menu borderless inverted vertical fluid className={style.sideMenu}>
            <Menu.Item
                onClick={() => clickSwitchCategory({ category: 'all' })}>
                <Label color='teal'>{noReadNum_all}</Label>
                全部分类</Menu.Item>
            <Menu.Item
                onClick={() => clickSwitchCategory({ category: '36kr' })}>
                <Label color='teal'>{noReadNum_kr}</Label>
                36kr</Menu.Item>
            <Menu.Item
                onClick={() => clickSwitchCategory({ category: 'ithome' })}>
                <Label color='teal'>{noReadNum_ithome}</Label>
                ithome</Menu.Item>
            <Menu.Item
                onClick={() => clickSwitchCategory({ category: 'ifanr' })}>
                <Label color='teal'>{noReadNum_ifanr}</Label>
                ifanr</Menu.Item>
        </Menu>
    </div>

)

export default SideBar