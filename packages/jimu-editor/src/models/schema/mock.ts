export default [
    {
      eid: 'app',
      parent: '',
      props: {
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
        canBeRemoved: false,
        name: '基础容器',
      },
    },
    {
      eid: '6f043f16[system-block]',
      parent: '6f043f12[system-container]',
      props: {
        visible: {
          type: 'Boolean',
          default: true,
          value: {
            type: 'STATIC',
            value: true,
          },
        },
        style: {
          height: 150
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
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        style: {
          left: 30,
          top: 50,
        }
      },
      editorData: {
        name: '按钮',
      },
    },
    {
      eid: '6f05eef5[common-button]',
      parent: '6f043f16[system-block]',
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        style: {
          left: 130,
          top: 50,
        }
      },
      editorData: {
        name: '按钮_1',
      },
    },
    {
      eid: '6f05f4ac[common-button]',
      parent: '6f043f16[system-block]',
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        style: {
          left: 230,
          top: 50,
        }
      },
      editorData: {
        name: '按钮_2',
      },
    },
    {
      eid: '6f0605e9[system-block]',
      parent: '6f043f12[system-container]',
      props: {
        visible: {
          type: 'Boolean',
          default: true,
          value: {
            type: 'STATIC',
            value: true,
          },
        },
        style: {
          height: 150
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
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        style: {
          left: 130,
          top: 50,
        }
      },
      editorData: {
        name: '按钮_3',
      },
    },
    {
      eid: '6f06253e[common-button]',
      parent: '6f0605e9[system-block]',
      props: {
        url: {
          type: 'String',
          value: {
            type: 'STATIC',
            value: '',
          },
        },
        style: {
          left: 230,
          top: 50,
        }
      },
      editorData: {
        name: '按钮_4',
      },
    },
  ];
  