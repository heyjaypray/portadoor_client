import moment from 'moment';
import Size from '../Breakdowns/DrawerBoxes/Size'
import Sides from '../Breakdowns/DrawerBoxes/Sides';
import Fronts from '../Breakdowns/DrawerBoxes/Fronts';
import Bottoms from '../Breakdowns/DrawerBoxes/Bottoms';
import _ from 'lodash'
import LinearIN from '../Breakdowns/DrawerBoxes/LinearIN';
import LinearFT from '../Breakdowns/DrawerBoxes/LinearFT';
import SQFT from '../Breakdowns/DrawerBoxes/SQFT';




export default data => {
  return [
    {
      columns: [
        {
          stack: [
            { text: 'Assembly List', bold: true },
            `Shipping Date: ${moment(data.jobInfo.DueDate).format('MM/DD/YYYY')}`,
            { qr: `${data.id}`, fit: '75', margin: [0, 5, 0, 0] },
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
            { text: `Order #: ${data.orderNum}`, alignment: 'right' },
            { text: `Est. Ship: ${moment(data.jobInfo.DueDate).format('MM/DD/YYYY')}`, alignment: 'right' }
          ]
        }
      ]
    },
    {
      columns: [
        {
          text: `${data.jobInfo.jobName} - ${data.jobInfo.customer.Company}`,
          margin: [0, 10]
        },
        { text: 'Job: None', alignment: 'right', margin: [0, 0, 80, 0] }
      ]
    },
    {
      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }]
    },
    data.part_list.map(i => {

      const info = []

      const tableBody = []

      const materialBody = []

      const groupedByHeight = _.groupBy(i.dimensions, 'height');

      Object.entries(groupedByHeight).map(([k, v], lineIn) => {

        const groupedInfoBody = [
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                stack: [
                  {
                    text: `Drawer Box ${i.boxThickness.Thickness}`,
                    style: 'fonts'
                  },
                  { text: `${i.woodtype.NAME}`, style: 'woodtype' }
                ]
              },
              {
                stack: [
                  {
                    text: `Bottom: ${i.boxBottomWoodtype.NAME}`,
                    style: 'fonts'
                  }
                ],
                alignment: 'right'
              }
            ]
          },
          {
            canvas: [
              { type: 'line', x1: 0, y1: 0, x2: 540, y2: 0, lineWidth: 1 }
            ],
            margin: [0, 10, 0, 0]
          },
        ]

        const groupedTableBody = [
          [
            { text: 'Item', style: 'fonts' },
            { text: 'Qty', style: 'fonts' },
            { text: 'Finish Box Size', style: 'fonts' },
            { text: 'Qty Box Sides', style: 'fonts' },
            { text: 'Qty Box Fronts/Backs', style: 'fonts' },
            { text: 'Box Bottoms', style: 'fonts' },
          ]
        ]

        const groupedMaterialBody = []



        v.forEach((item, index) => {
         
          let tb = [
            { text: item.item, style: 'fonts' },
            { text: item.qty, style: 'fonts' },
            { text: Size(item), style: 'fonts' },
            { text: `${Sides(item, i).qty} - ${Sides(item, i).measurement}`, style: 'fonts' },
            { text: `${Fronts(item, i).qty} - ${Fronts(item, i).measurement}`, style: 'fonts' },
            { text: Bottoms(item, i), style: 'fonts' }
          ]
          groupedTableBody.push(tb)
        })


        let mb = {
          columns: [
            { text: `${i.woodtype.NAME}`, style: 'fonts' },
            { text: `${k} x ${i.boxThickness.Thickness}`, style: 'fonts' },
            { text: `${SQFT(v, i)} Sq FT`, style: 'fonts' },
            { text: `${LinearFT(v, i)} Lin FT`, style: 'fonts' },
            { text: `${LinearIN(v, i)} Lin IN`, style: 'fonts' },
            { text: '', style: 'fonts' },
          ]
        }


        return (
          info.push(groupedInfoBody),
          tableBody.push(groupedTableBody),
          groupedMaterialBody.push(mb),
          materialBody.push(groupedMaterialBody)
        )


      });

      let table = tableBody.map((i, index) => {
        return [
          info[index],
          {
            table: {
              headerRows: 1,
              widths: [22, 15, '*', '*', '*', '*'],
              body: i
            },
            layout: 'lightHorizontalLines'
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 540, y2: 0, lineWidth: 1 }]
          }
        ]
      })

      const materialBreakdown = materialBody.map((i, index) => {
    
        return i
      })

      let body = [
        table,
        {
          text: 'Box Sides / Box Fronts & Backs - Material Breakdown', style: 'fonts', margin: [0, 12, 0, 0],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 540, y2: 0, lineWidth: 1 }]
        },
        materialBreakdown
      ]

      return body

    }),
    { text: '', pageBreak: 'before' }
  ];
};