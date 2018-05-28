<i18n src="./i18n.yaml"></i18n>
<script>
  /* eslint-disable one-var */

  import { SET_LEFT_SIDE_BAR_STATUS, SET_FETCH_PENDING } from 'store/mutation-types'
  import { common, agent, nonAgent, zhMenu, enMenu } from 'src/config/menu.config.js'
  import { POLLING_INTERVAL } from 'src/config/app.config.js'
  import pageService from 'src/services/pageService'

  export default {
    data () {
      return {
        routerArr: [],
        items: [],
        pendingNumber: {},
        key: Math.random()
      }
    },
    render (createElement) {
      let nodes = [], level = 0, id = 0
      /* 渲染一个菜单项 */
      const renderOneItem = (node, notice) => {
        let children = [], routerLink
        if (node.icon) {
          children.push(createElement('i', {
            'class': ['fa', 'fa-' + node.icon]
          }))
        }
        debugger
        console.log('dadnan', this.$t)
        children.push(createElement('span', this.$t('menu.' + node.title)))
        if (notice) {
          children.push(createElement('mu-badge', {
            props: {
              content: notice + '',
              primary: true,
              color: '#D2312D'
            }
          }))
        }
        if (node.routerLink && node.to) {
          routerLink = createElement('router-link', {
            props: {
              to: node.to,
              exact: false
            }
          }, children)
        }
        return routerLink ? [routerLink] : children
      }
      const getPendingNumber = (node) => {
        if (this.pendingNumber && node.notice && this.pendingNumber[node.notice]) {
          return this.pendingNumber && node.notice && this.pendingNumber[node.notice]
        } else {
          return 0
        }
      }
      const createChild = (rootNode, level) => {
        let children = [], childrenNodes = [], number = 0
        if (rootNode.subs && rootNode.subs.length > 0) {
          for (let j = 0, lenJ = rootNode.subs.length; j < lenJ; j++) {
            rootNode.subs[j].id = ++id
            rootNode.subs[j].index = rootNode.index + '-' + j
            let {node, _number} = createChild(rootNode.subs[j], level + 1)
            children.push(node)
            number += _number
          }
          childrenNodes = createElement('chp-list-expand', [createElement('chp-list', children)])
        } else {
          number = getPendingNumber(rootNode)
        }
        return {
          node: createElement('chp-list-item', {
            'class': [
              {
                'chp-inset': !rootNode.icon
              },
              'level-' + level + '-menu'
            ],
            props: {
              open: rootNode.open
            }
          }, [renderOneItem(rootNode, number), childrenNodes]),
          _number: number
        }
      }

      for (let i = 0, len = this.items.length; i < len; i++) {
        this.items[i].id = ++id
        this.items[i].index = i
        nodes.push(createChild(this.items[i], level).node)
      }
      return createElement('chp-list', {
        props: {
          key: this.key
        }
      }, nodes)
    },
    methods: {
      closeAllItems () {
        try {
          let traverse = (root) => {
            if (root.open !== undefined) {
              root.open = false
            }
            if (root.subs) {
              for (let i = 0, len = root.subs.length; i < len; i++) {
                traverse(root.subs[i])
              }
            }
          }
          for (let i = 0, len = this.items.length; i < len; i++) {
            traverse(this.items[i])
          }
        } catch (ex) {
          console.log(ex)
        }
      },
      setItemsOpen (path) {
        this.closeAllItems()
        let parentIds = []
        const getPathIndex = (path) => {
          let _pathIndex
          const traverseChild = (node) => {
            if (node.subs && node.subs.length > 0) {
              for (let j = 0, lenJ = node.subs.length; j < lenJ; j++) {
                let oneItem = node.subs[j]
                if (oneItem.to === path) {
                  return oneItem.index
                } else {
                  let _index = traverseChild(oneItem)
                  if (_index) {
                    return _index
                  } else {
                    continue
                  }
                }
              }
            }
          }
          for (let i = 0, len = this.items.length; i < len; i++) {
            let oneItem = this.items[i]
            if (oneItem.to === path) {
              return oneItem.index
            } else {
              let _index = traverseChild(oneItem)
              if (_index) {
                return _index
              } else {
                continue
              }
            }
          }

          return _pathIndex
        }

        let _path = getPathIndex(path) + ''
        if (_path.indexOf('-') > -1) {
          parentIds = _path.split('-')
        } else {
          parentIds = new Array(_path)
        }

        const setAllparents = () => {
          if (!parentIds) {
            return
          }
          let len = parentIds.length
          if (len === 1) {
            let index1 = parentIds[0]
            this.$set(this.items, index1, Object.assign(this.items[index1], {open: true}))
          }
          if (len === 2) {
            let index1 = parentIds[0], index2 = parentIds[1]
            this.$set(this.items, index1, Object.assign(this.items[index1], {open: true}))
            this.$set(this.items[index1].subs, index2, Object.assign(this.items[index1].subs[index2], {open: true}))
          }
          if (len === 3) {
            let index1 = parentIds[0], index2 = parentIds[1], index3 = parentIds[2]
            this.$set(this.items, index1, Object.assign(this.items[index1], {open: true}))
            this.$set(this.items[index1].subs, index2, Object.assign(this.items[index1].subs[index2], {open: true}))
            this.$set(this.items[index1].subs[index2].subs, index3, Object.assign(this.items[index1].subs[index2].subs[index3], {open: true}))
          }
        }

        setAllparents()
      },
      filterByLanguageAndRole (language, hasAgent) {
        let temp = common.slice(),
          languageTmp = language === 'zh' ? zhMenu : enMenu,
          agentTmp = hasAgent ? agent : nonAgent
        temp.splice(3, 0, ...agentTmp)
        temp.splice(4, 0, ...languageTmp)
        this.items = temp
      },
      repaintMenu () {
        this.key = Math.random()
        if (this.items) {
          this.setItemsOpen(this.$route.path)
        }
      },
      async fetchNoticeNumber () {
        let {success, data, message, error} = await pageService.fetchPending(this.$store.state.language === 'zh' ? 'mandarin' : 'english')
        if (success) {
          this.pendingNumber = data
          this.repaintMenu()
        }
        return {success, data, message, error}
      },
      polling () {
        let poll = () => {
          return setTimeout(async () => {
            let {success} = await this.fetchNoticeNumber()
            if (success) {
              this.timer = poll()
            } else { // 如果是401 就不再进行请求
              clearTimeout(this.timer)
            }
          }, POLLING_INTERVAL)
        }
        this.timer = poll()
      }
    },
    created () {
      this.filterByLanguageAndRole(this.$store.state.language, this.$store.state.userInfo && this.$store.state.userInfo.hasAgent)
      this.fetchNoticeNumber()
    },
    mounted () {
      this.setItemsOpen(this.$route.path)
      this.polling()
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    watch: {
      $route (val, oldVal) {
        if (window.innerWidth < 768) { // 小屏幕下才自动关闭，大屏幕不会
          this.$store.commit(SET_LEFT_SIDE_BAR_STATUS, false)
        }
      },
      '$route.path': function (val) {
        this.setItemsOpen(val)
      },
      '$store.state.language': function (val) {
        this.filterByLanguageAndRole(val, this.$store.state.userInfo && this.$store.state.userInfo.hasAgent)
      },
      '$store.state.fetchPending': function (val) {
        if (val) {
          this.fetchNoticeNumber()
          this.$store.commit(SET_FETCH_PENDING, false)
        }
      }
    }
  }
</script>
