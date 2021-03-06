import moment from 'moment';
import Size from '../Breakdowns/Doors/Size';

export default (data, breakdowns) => {
  return [
    {
      columns: [
        {
          stack: ['QC Check Off Sheet']
        },
        {
          stack: [
            { text: 'Porta Door Co. Inc.', alignment: 'center' },
            { text: '65 Cogwheel Lane', alignment: 'center' },
            { text: 'Seymour, CT', alignment: 'center' },
            { text: '203-888-6191', alignment: 'center' },
            { text: moment().format('DD-MMM-YYYY'), alignment: 'center' }
          ]
        },
        {
          stack: [
            { text: data.job_info.Rush && data.job_info.Sample ? 'Sample / Rush' : data.job_info.Rush ? 'Rush' : data.job_info.Sample ? 'Sample' : '', alignment: 'right', bold: true },
            { text: `Order #: ${data.orderNum}`, alignment: 'right' },
            { text: `Estimated Ship: ${moment(data.job_info.DueDate).format('MM/DD/YYYY')}`, alignment: 'right' }
          ]
        }
      ]
    },
    {
      columns: [
        {
          text: `${data.job_info.customer.Company}`,
          style: 'fonts'
        },
        {
          stack: [
            { text: `PO: ${data.job_info.poNum}`, alignment: 'right', style: 'fonts' }
          ]
        },
      ],
      margin: [0, 10,0,0]
    },
    {
      text:
        '==============================================================================',
      alignment: 'center',
    },
    data.part_list.map((i, index) => {
      const tableBody = [
        [
          { text: 'Item', style: 'fonts' },
          { text: 'Qty', style: 'fonts' },
          { text: 'Actual Size WxH', style: 'fonts' },
          { text: 'CHK', style: 'fonts' },
          { text: 'L/R', style: 'fonts' },
          { text: 'Build Instruction', style: 'fonts' },
          { text: 'Cab#', style: 'fonts' },
        ]
      ];

      i.dimensions.forEach((item, index) => {
        // Panels(item, i, breakdowns);
        tableBody.push([
          { text: index + 1, style: 'fonts' },
          { text: item.qty, style: 'fonts' },
          { text: Size(item), style: 'fonts' },
          { text: '[      ]', style: 'fonts' },
          { text: 'N/A', style: 'fonts' },
          item.notes || item.full_frame || item.lite ? 
            {
              text: `${item.notes ? item.notes : ''} ${
                item.full_frame ? 'Full Frame DF' : ''
              } ${item.lite ? item.lite.NAME : ''}`,
              style: 'tableBold', alignment: 'left'
            } : null,
          item.cab_number ? {
            text: `${item.cab_number}`, style: 'fonts', alignment: 'left'
          } : null
        ]);
      });

      return [
        {
          margin: [0, 2, 0, 0],
          columns: [
            {
              stack: [
                { text: `${i.woodtype.NAME}`, style: 'woodtype' },
                {
                  text: `${i.design ? i.design.NAME :
                    i.cope_design
                      ? i.cope_design.NAME
                      : i.mt_design
                        ? i.mt_design.NAME + ' ' + i.construction.value
                        : i.miter_design
                          ? i.miter_design.NAME + ' ' + i.construction.value
                          : i.miter_df_design
                            ? i.miter_df_design.NAME +
                        ' ' +
                        i.construction.value
                            : i.mt_df_design
                              ? i.mt_df_design.NAME + ' ' + i.construction.value :
                              (i.orderType.value === 'Slab_Door' || i.orderType.value === 'Slab_DF') ? '' :
                                i.construction.name
                  }`,
                  style: 'fonts',
                },
                // {
                //   text: `${i.orderType ? i.orderType.name : ''}`,
                //   style: 'fonts',
                // },
              ]
            },
            { text: ' ', style: 'fontsBold', width: 150 },
            { 
              stack: [
                {text: ' ', style:'woodtype' },
                {text: `Panel: ${
                  i.panel
                    ? i.panel.NAME
                    : (i.orderType.value === 'Slab_Door' || i.orderType.value === 'Slab_DF')
                      ? ''
                      : 'Glass'
                } ${i.lite ? '- ' + i.lite.NAME : ''}`, style: 'fonts', alignment:'right'}
              ]
            },
            { 
              stack: [
                {text: ' ', style: 'woodtype' },
                {text: `IP: ${i.profile ? i.profile.NAME : 'None'}`, style: 'fonts', alignment:'right' }
              ]
            },
            { 
              stack: [
                {text: ' ', style: 'woodtype' },
                {text: `Edge: ${i.edge ? i.edge.NAME : 'None'}`, style: 'fonts', alignment:'right' }
              ]
            },
          ]
        },
        {
          text:
            '==============================================================================',
          alignment: 'center',
        },
        {
          margin: [0,0,0,10],
          table: {
            headerRows: 1,
            widths: [22, 15, 110, 40, 40, 155, '*' ],
            body: tableBody,
          },
          layout: {
            hLineWidth: function (i, node) {
              if(i > 0){
                return 1;
              }
              else {
                return 0;
              }
            },
            vLineWidth: function (i, node) {
              return 0;
            },
            hLineStyle: function (i, node) {
              if (i === 1) {
                return { dash: { length: 1, space: 1 } };
              }
              else {
                return 1;
              }
            },
            paddingLeft: function (i) {
              return i === 0 ? 0 : 8;
            },
            paddingRight: function (i, node) {
              return i === node.table.widths.length - 1 ? 0 : 8;
            },
          },
        },
        {
          text:
            '==============================================================================',
          alignment: 'center',
        },
      ];
    }),
    // { text: '', pageBreak: 'before' }
  ];
};
