export default [
    {
      eid: 'app',
      parent: '',
      manifest: {
        name: 'app',
        cname: '基础容器'
      },
      props: {
        layout: {
          value: {
            value: 'BLOCK',
          }
        },
        visible: {
          type: 'Boolean',
          default: true,
          value: {
            type: 'STATIC',
            value: true,
          },
        },
        children: {
          type: 'Array',
          value: {
            type: 'STATIC',
            value: ['6f043f16[system-block]', '6f0605e9[system-block]'],
          },
        },
      },
      editorData: {
        name: '基础容器',
      },
    },
    {
      eid: '6f043f16[system-block]',
      parent: '6f043f12[system-container]',
      manifest: {
        name: 'system-block',
        cname: '空白楼层'
      },
      props: {
        layout: {
          value: {
            value: 'BLOCK',
          }
        },        visible: {
          type: 'Boolean',
          default: true,
          value: {
            type: 'STATIC',
            value: true,
          },
        },
        'styles.default.height': {
          type: 'Number',
          default: 300,
          value: {
            type: 'STATIC',
            value: 150,
          },
        },
        
        children: {
          type: 'Array',
          value: {
            type: 'STATIC',
            value: [
              '6f05a132[common-button]',
              '6f05eef5[common-button]',
              '6f05f4ac[common-button]',
            ],
          },
        },
      },
      editorData: {
        name: '空白楼层',
        isCustomSize: true,
      },
    },
    {
      eid: '6f05a132[common-button]',
      parent: '6f043f16[system-block]',
      manifest: {
        name: 'common-button',
        cname: '按钮'
      },
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        'styles.default.left': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 30,
          },
        },
        'styles.default.top': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 50,
          },
        },
      },
      editorData: {
        name: '按钮',
      },
    },
    {
      eid: '6f05eef5[common-button]',
      parent: '6f043f16[system-block]',
      manifest: {
        name: 'common-button',
        cname: '按钮'
      },
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        'styles.default.left': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 130,
          },
        },
        'styles.default.top': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 50,
          },
        },
      },
      editorData: {
        name: '按钮_1',
      },
    },
    {
      eid: '6f05f4ac[common-button]',
      parent: '6f043f16[system-block]',
      manifest: {
        name: 'common-button',
        cname: '按钮'
      },
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        'styles.default.left': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 230,
          },
        },
        'styles.default.top': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 50,
          },
        },
      },
      editorData: {
        name: '按钮_2',
      },
    },
    {
      eid: '6f0605e9[system-block]',
      parent: '6f043f12[system-container]',
      manifest: {
        name: 'system-block',
        cname: '空白楼层'
      },
      props: {
        layout: {
          value: {
            value: 'BLOCK',
          }
        },
        visible: {
          type: 'Boolean',
          default: true,
          value: {
            type: 'STATIC',
            value: true,
          },
        },
        'styles.default.height': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 150,
          },
        },
        children: {
          type: 'Array',
          value: {
            type: 'STATIC',
            value: ['6f062257[common-button]', '6f06253e[common-button]'],
          },
        },
      },
      editorData: {
        name: '空白楼层_1',
      },
    },
    {
      eid: '6f062257[common-button]',
      parent: '6f0605e9[system-block]',
      manifest: {
        name: 'common-button',
        cname: '按钮'
      },
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        'styles.default.left': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 130,
          },
        },
        'styles.default.top': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 50,
          },
        },
      },
      editorData: {
        name: '按钮_3',
      },
    },
    {
      eid: '6f06253e[common-button]',
      parent: '6f0605e9[system-block]',
      manifest: {
        name: 'common-button',
        cname: '按钮'
      },
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        'styles.default.left': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 230,
          },
        },
        'styles.default.top': {
          type: 'Number',
          value: {
            type: 'STATIC',
            value: 50,
          },
        },
      },
      editorData: {
        name: '按钮_4',
      },
    },
  ];
  