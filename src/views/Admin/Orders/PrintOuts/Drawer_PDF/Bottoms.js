import moment from 'moment';
import Size from '../Breakdowns/DrawerBoxes/Size';
import Bottoms from '../Breakdowns/DrawerBoxes/Bottoms';
import LinearIN from '../Breakdowns/DrawerBoxes/LinearIN';
import _ from 'lodash';


export default (data, breakdowns) => {
  return [
    {
      columns: [
        {
          stack: [
            { text: 'Bottoms List', bold: true },
            `Shipping Date: ${moment(data.job_info.DueDate).format('MM/DD/YYYY')}`
          ]
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
            { text: `Est. Completion: ${moment(data.job_info.DueDate).format('MM/DD/YYYY')}`, alignment: 'right' }
          ]
        }
      ]
    },
    {
      columns: [
        {
          text: `${data.job_info.customer.Company}`,

        },
        { text: `Job: ${data.job_info.poNum}`, alignment: 'right' }
      ],
      margin: [0, 10]
    },
    {
      text:
        '==============================================================================',
      alignment: 'center',
    },
    data.part_list.map((i, index) => {
      let sortedDimensions = i.dimensions.sort(function (a, b) { return b.width - a.width; });


      const bottoms = [
        [
          { text: 'Item', style: 'fonts' },
          { text: 'Qty', style: 'fonts' },
          { text: 'Finish Box Size', style: 'fonts' },
          { text: 'Qty', style: 'fonts' },
          { text: 'Drawer Bottom Size', style: 'fonts' },

        ]
      ];
      sortedDimensions.forEach((item, index) => {

        bottoms.push([
          { text: item.item, style: 'fonts' },
          { text: item.qty, style: 'fonts' },
          { text: Size(item, i), style: 'fonts' },
          { text: Bottoms(item, i, breakdowns).qty, style: 'fonts' },
          { text: Bottoms(item, i, breakdowns).measurement, style: 'fonts' },
        ]);
      });


      const materialBody = [];


      const groupedByDepth = _.groupBy(i.dimensions, 'depth');
      Object.entries(groupedByDepth).map(([k, v]) => {

        const groupedMaterialBody = [];

        let mb = {
          columns: [
            { text: `${i.box_bottom_woodtype.NAME}`, style: 'fonts' },
            { text: `${k} x ${i.box_thickness.NAME}`, style: 'fonts' },
            { text: `= ${LinearIN(v, i, breakdowns)} Lin IN`, style: 'fonts' },
            { text: '', style: 'fonts' },
          ]
        };

        return (
          groupedMaterialBody.push(mb),
          materialBody.push(groupedMaterialBody)
        );
      });

      return [
        {
          margin: [0, 10, 0, 0],
          columns: [
            {
              stack: [
                { text: `${i.box_bottom_thickness.NAME} ${i.box_bottom_woodtype.NAME}`, style: 'woodtype' },
                { text: `Notes: ${i.notes ? i.notes : ''}`, style: 'fontsBold' },
              ]
            },
            {
              text: `${i.box_notch.NAME === 'Yes - Add in Misc Items' ? 'Notch and Drilled' : ''}`,
              style: 'fontsBold',
              alignment: 'center'
            },
          ]
        },
        {
          text:
            '==============================================================================',
          alignment: 'center',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 40, 180, 30, '*'],
            body: bottoms
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 1 ? 1 : 0;
            },
            vLineWidth: function (i, node) {
              return 0;
            },
            hLineStyle: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return { dash: { length: 1, space: 1 } };
            },
            paddingLeft: function (i) {
              return i === 0 ? 0 : 8;
            },
            paddingRight: function (i, node) {
              return i === node.table.widths.length - 1 ? 0 : 8;
            },
          },
          margin: [0, 0, 0, 10]
        },

        {
          text:
            '==============================================================================',
          alignment: 'center',
        },
        {
          text: 'Box Sides / Box Fronts & Backs - Linear Inch Material Breakdown - "Width x Thickness"', style: 'fonts', margin: [0, 12, 0, 0],
        },
        {
          text:
            '==============================================================================',
          alignment: 'center',
        },
        materialBody,
        {
          text:
            '==============================================================================',
          alignment: 'center',
        },
        // { text: '', pageBreak: 'before' }
      ];
    }),
  ];
};
