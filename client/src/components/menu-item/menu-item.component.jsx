import React from 'react';
// import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';
import { BackgroundImageContainer, ContentContainer, ContentSubtitle, ContentTitle, MenuItemContainer } from './menu-item.styles';
 
const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => (
    <MenuItemContainer size={size} 
    onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <BackgroundImageContainer className='background-image'
        imageUrl={imageUrl}/>
        <ContentContainer className='content'>
            <ContentTitle>{title.toUpperCase()}</ContentTitle>
            <ContentSubtitle className='subtitle'>SHOP NOW</ContentSubtitle>
        </ContentContainer>
    </MenuItemContainer>
)

export default withRouter(MenuItem);