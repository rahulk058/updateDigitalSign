import React, { Component } from 'react';
import {Button, Menu, Tooltip, Modal, Popconfirm} from 'antd';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { Flex } from '../components/flex';
import Icon from '../components/icon/Icon';
import { ShortcutHelp } from '../components/help';
import CommonButton from "../components/common/CommonButton";

class Title extends Component {
	static propTypes = {
		currentMenu: PropTypes.string,
		onChangeMenu: PropTypes.func,
	};

	state = {
		visible: false,
	};

	componentDidMount() {
		if (window) {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		}
	}


	render() {
        const { title, content, action, children } = this.props;
		return (
            children || (
                <Flex className="rde-content-layout-title" alignItems="center" flexWrap="wrap">
                    <Flex.Item flex="0 1 auto">
                        <Flex
                            className="rde-content-layout-title-title"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            {title instanceof String ? <h3>{title}</h3> : title}
                        </Flex>
                    </Flex.Item>
                    <Flex.Item flex="auto">
                        <Flex className="rde-content-layout-title-content" alignItems="center">
                            {content}
                        </Flex>
                    </Flex.Item>
                    <Flex.Item flex="auto">
                        <Flex className="rde-content-layout-title-action" justifyContent="flex-end" alignItems="center">
                            {action}
                        </Flex>
                    </Flex.Item>
                </Flex>
            )

        );
	}
}

export default Title;
