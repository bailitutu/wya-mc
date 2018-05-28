const warn = (msg, getValue) => {
	console.warn(msg);
	console.log('接受到的值为：', getValue);
};

Component({
	options: {
		multipleSlots: true
	},
	properties: {
		title: {
			type: String,
			description: '左侧标题'
		},
		label: {
			type: String,
			description: '标题下方的描述信息'
		},
		value: {
			type: String,
			description: '右侧内容'
		},
		isLink: {
			type: null,
			description: '是否展示右侧箭头并开启尝试以 url 跳转'
		},
		linkType: {
			type: String,
			value: 'navigateTo',
			description: '链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch'
		},
		url: {
			type: String,
			value: ''
		},
		extra: {
			type: String,
			value: '',
			description: '额外文字，箭头左边的文字'
		},
		styles: {
			type: String,
			value: ''
		}
	},
	externalClasses: ["classes"],
	methods: {
		cellTap() {
			if (this.data.onlyTapFooter) {
				return;
			}

			this.triggerEvent('tap', {});
			doNavigate.call(this);
		},

		// 用于被 cell-group 更新，标志是否是最后一个 cell
		updateIsLastCell(isLastCell) {
			this.setData({ isLastCell });
		}
	}
});

// 处理跳转
function doNavigate() {
	const { url = '' } = this.data;
	const type = typeof this.data.isLink;

	if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

	if (type !== 'boolean' && type !== 'string') {
		warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink);
		return;
	}

	if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
		warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType);
		return;
	}
	wx[this.data.linkType].call(wx, { url });
}