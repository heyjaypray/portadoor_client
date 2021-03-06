import moment from 'moment';
import Size from '../Breakdowns/Doors/Size';
import Glass_Selection from '../Sorting/Glass_Selection';
import pdfDoorPricing from '../../../selectors/pdfDoorPricing';

export default (data, pricing) => {
  const qty = data.part_list.map((part, i) => {
    return part.dimensions
      .map((dim, index) => {
        return parseInt(dim.qty);
      })
      .reduce((acc, item) => acc + item, 0);
  });

  const subTotal = data.subTotals.reduce((acc, item) => acc + item, 0);

  const balancePaid = data.balance_history.reduce(function (
    accumulator,
    balance
  ) {
    return accumulator + balance.balance_paid;
  },
  0);

  const balanceDue = data.total - balancePaid;

  const misc_prices = data.misc_items.map((i) => {
    if (i.category === 'preselect') {
      return parseFloat(i.qty) * parseFloat(i.price);
    } else {
      return i.pricePer ? parseFloat(i.qty) * parseFloat(i.pricePer) : 0;
    }
  });

  const misc_total = misc_prices.reduce((acc, item) => acc + item, 0);

  const discountTotal = subTotal * (data.discount / 100);

  const discountSubTotal = subTotal - discountTotal;

  const order_sub_total = misc_total + discountSubTotal;


  const parts = Glass_Selection(data);

  const prices = pdfDoorPricing(parts, pricing[0]);

  const table_content = Glass_Selection(data).map((part, i) => {
    const tableBody = [
      [
        { text: 'Item', style: 'fonts' },
        { text: 'Actual Size WxH', style: 'fonts' },
        { text: 'Qty', style: 'fonts', alignment: 'center' },
        { text: 'Notes', style: 'fonts' },
        { text: 'Total 1 Unit', style: 'fonts', alignment: 'right' },
        { text: 'Total Cost', style: 'fonts', alignment: 'right' },
      ],
    ];

    part.dimensions.forEach((item, index) => {
      tableBody.push([
        { text: item.item ? item.item : index + 1, style: 'fonts' },
        { text: `${Size(item)}`, style: 'fonts' },
        { text: `${item.qty}`, style: 'fonts', alignment: 'center' },
        {
          text: `${item.notes ? item.notes : ''} ${
            item.full_frame ? 'Full Frame DF' : ''
          } ${item.lite ? item.lite.NAME : ''}`,
          style: 'fontsBold',
        },

        {
          text: `${(prices[i][index] / parseInt(item.qty)).toFixed(2)}`,
          style: 'fonts',
          alignment: 'right',
        },
        {
          text: `${prices[i][index].toFixed(2)}`,
          style: 'fonts',
          alignment: 'right',
          width: 210,
        },
      ]);
    });

    return [
      {
        margin: [0, 0, 0, 0],
        columns: [
          {
            stack: [
              {
                text: `${part.orderType ? part.orderType.name : ''}`,
                style: 'fonts',
              },
              {
                
                text: `${part.woodtype.NAME} - ${part.thickness?.thickness_1} - ${part.thickness?.thickness_2}"`,
                style: 'fonts',
              },

              {
                text: `${
                  part.design
                    ? part.design.NAME
                    : part.face_frame_design
                      ? part.face_frame_design.NAME
                      : part.construction.value === 'Slab'
                        ? 'Slab'
                        : ''
                } - ${
                  part.panel
                    ? part.panel.NAME
                    : part.construction.value === 'Slab'
                      ? ''
                      : 'Glass'
                }`,
                style: 'fonts',
              },
            ],
          },

          {
            width: 200,
            stack: [
              {
                text: `${part.notes ? part.notes : ''}`,
                style: 'headerFont',
                alignment: 'center',
              },
              part.applied_profile?.NAME !== 'None'
                ? {
                  text: `${
                    part.applied_profile ? part.applied_profile.NAME : ''
                  }`,
                  style: 'fontsBold',
                  alignment: 'center',
                }
                : null,
            ],
          },
          {
            stack: [
              {
                text: `IP: ${
                  part.profile ? part.profile.NAME : 'None'
                }  Edge: ${part.edge ? part.edge.NAME : 'None'}`,
                style: 'fonts',
              },
            ],
            alignment: 'right',
          },
        ],
      },
      {
        text: '==============================================================================',
        alignment: 'center',
      },
      {
        table: {
          headerRows: 1,
          widths: [30, 100, 30, 155, '*', '*'],
          body: tableBody,
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
      },
      {
        stack: [
          {
            columns: [
              {
                text: '-------',
                margin: [164, 0, 0, 0],
              },
            ],
            margin: [0, 0, 0, -10],
          },
          {
            columns: [
              {
                text: '------------',
                margin: [0, 0, 0, 0],
                alignment: 'right',
              },
            ],
            margin: [0, 0, 0, -10],
          },
          {
            columns: [
              {
                text: '',
                width: 120,
              },
              {
                text: ' Total: ',
                width: 55,
                style: 'fonts',
                alignment: 'left',
              },
              { text: `${qty[i]}`, style: 'fonts', alignment: 'left' },
              {
                margin: [14, 0, 0, 0],
                columns: [
                  {
                    text: 'Item Subtotal',
                    style: 'fonts',
                    margin: [0, 0, 0, 0],
                    alignment: 'right',
                    width: 79,
                  },
                  {
                    text: `${prices[i]
                      .reduce((acc, item) => acc + item, 0)
                      .toFixed(2)}`,
                    style: 'fonts',
                    margin: [0, 0, 0, 0],
                    alignment: 'right',
                    width: 77,
                  },
                ],
              },
            ],
            margin: [0, 10, 0, 5],
          },
        ],
      },

      {
        text: '==============================================================================',
        alignment: 'center',
      },
    ];
  });

  return [
    {
      columns: [
        {
          width: 200,
          stack: [{ text: 'INVOICE', margin: [0, 0, 0, -10] }],
          style: 'headerFont',
          id: 'header1',
        },

        {
          stack: [
            { text: 'Porta Door Co. Inc.', alignment: 'center' },
            { text: '65 Cogwheel Lane', alignment: 'center' },
            { text: 'Seymour, CT', alignment: 'center' },
            {
              text: '203-888-6191',
              alignment: 'center',
              margin: [0, 0, 0, 10],
            },
            { text: moment().format('DD-MMM-YYYY'), alignment: 'center' },
          ],
          // width: 200,
          alignment: 'center',
        },
        {
          stack: [
            {
              text:
                data.job_info.Rush && data.job_info.Sample
                  ? 'Sample / Rush'
                  : data.job_info.Rush
                    ? 'Rush'
                    : data.job_info.Sample
                      ? 'Sample'
                      : '',
              alignment: 'right',
              style: 'rushFonts',
            },
            {
              text: `Order #: ${data.orderNum}`,
              alignment: 'right',
              style: 'headerFont',
            },
            {
              text: `${
                data.status === 'Quote'
                  ? ''
                  : `Estimated Ship: ${moment(data.job_info.DueDate).format(
                    'MM/DD/YYYY'
                  )}`
              }`,
              alignment: 'right',
              style: 'headerFont',
            },
            {
              text: `Ship Via: ${
                data.job_info.ShippingMethod
                  ? data.job_info.ShippingMethod.NAME
                  : ' '
              }`,
              alignment: 'right',
              style: 'headerFont',
            },
            {
              text: `Salesmen: ${data.sale ? data.sale.fullName : ''}`,
              alignment: 'right',
              style: 'headerFont',
            },
          ],
        },
      ],
    },
    {
      columns: [
        {
          width: 200,
          stack: [
            {
              columns: [
                {
                  text: 'Customer - ',
                  width: 60,
                },
                {
                  stack: [
                    { text: `${data.job_info.customer.Company}` },
                    {
                      text: `${
                        data.companyprofile.Address1
                          ? data.companyprofile.Address1
                          : ''
                      }`,
                      style: 'fonts',
                    },
                    {
                      text: `${data.companyprofile.City}, ${data.job_info.State} ${data.job_info.Zip}`,
                      style: 'fonts',
                    },
                    {
                      text: `Ph: ${data.companyprofile.Phone1}`,
                      style: 'fonts',
                    },
                    data.companyprofile.Fax
                      ? {
                        text: `Fax: ${
                          data.companyprofile.Fax
                            ? data.companyprofile.Fax
                            : ''
                        }`,
                        style: 'fonts',
                        margin: [0, 0, 0, 10],
                      }
                      : null,
                    {
                      text: `Terms: ${
                        data.companyprofile.PMT_TERMS
                          ? data.companyprofile.PMT_TERMS
                          : ''
                      }`,
                      style: 'fonts',
                    },
                  ],
                },
              ],

              style: 'fontsBold',
              margin: [0, 0, 0, 0],
            },
          ],
          style: 'headerFont',
        },

        {
          text: '',
          alignment: 'center',
        },
        {
          stack: [
            {
              margin: [10, 0, 0, 0],
              columns: [
                {
                  width: 40,
                  stack: [
                    {
                      text: 'Job: ',
                      alignment: 'left',
                      margin: [0, 0, 0, 0],
                      style: 'fonts',
                    },
                    {
                      text: 'Ship To: ',
                      style: 'fonts',
                      alignment: 'left',
                      margin: [0, 0, 0, 0],
                    },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${
                        data.job_info.poNum.length > 0
                          ? data.job_info.poNum
                          : 'None'
                      }`,
                      alignment: 'left',
                      margin: [0, 0, 0, 0],
                      style: 'fonts',
                    },
                    {
                      text: `${data.job_info.customer.Company}`,
                      style: 'fonts',
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `${data.job_info.Address1}`,
                      style: 'fonts',
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `${
                        data.job_info.Address2 ? data.job_info.Address2 : ''
                      }`,
                      style: 'fonts',
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `${data.job_info.City}, ${data.job_info.State} ${data.job_info.Zip}`,
                      style: 'fonts',
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `${data.companyprofile.Phone1}`,
                      style: 'fonts',
                      margin: [0, 0, 0, 0],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: '==============================================================================',
      alignment: 'center',
      margin: [0, 5, 0, 0],
    },

    //table content here
    table_content,

    {
      columns: [
        {
          text: `Total Number of Pieces: ${qty.reduce(
            (acc, item) => acc + item,
            0
          )}`,
          style: 'fonts',
          width: 317,
        },
        {
          text: 'Order Subtotal',
          style: 'totals',
          margin: [0, 0, 0, 0],
          width: 120,
          alignment: 'right',
        },
        {
          text: `$${subTotal.toFixed(2)}`,
          style: 'fonts',
          margin: [0, 0, 0, 0],
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 10],
    },
    {
      columns: [
        { text: '', style: 'totals', width: 317 },
        {
          text: `${data.discount > 0 ? data.discount + '% Discount' : ''}`,
          style: 'totals',
          margin: [0, 0, 0, 0],
          alignment: 'right',
          width: 120,
        },
        {
          text: `${data.discount > 0 ? '- $' + discountTotal.toFixed(2) : ''}`,
          style: 'fonts',
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 0],
    },
    {
      text: '------------',
      margin: [0, 0, 0, 0],
      alignment: 'right',
    },
    {
      columns: [
        { text: '', style: 'totals', width: 317 },
        {
          text: `${data.discount > 0 ? 'Discount Subtotal' : ''}`,
          style: 'totals',
          margin: [0, 0, 0, 0],
          width: 120,
          alignment: 'right',
        },
        {
          text: `${data.discount > 0 ? '$' + discountSubTotal.toFixed(2) : ''}`,
          style: 'fonts',
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 0],
    },
    data.misc_items.length > 0
      ? {
        columns: [
          {
            text: `${
              data.misc_items.length > 0 ? 'Miscellaneous Extra' : ''
            }`,
            style: 'fonts',
            decoration: 'underline',
            width: 168,
          },
          {
            text: 'Qty',
            style: 'fonts',
            decoration: 'underline',
            width: 33,
          },
          {
            text: 'Cost Per',
            style: 'fonts',
            margin: [0, 0, 0, 0],
            decoration: 'underline',
          },
          {
            text: '',
            style: 'totals',
            margin: [0, 0, 0, 0],
            alignment: 'right',
          },
        ],
        margin: [0, 10, 0, 0],
      }
      : null,
    data.misc_items.length > 0
      ? {
        columns: [
          {
            text: data.misc_items.map((i) => {
              return `${i.item ? i.item.NAME : i.item2 ? i.item2 : ''} \n`;
            }),
            style: 'fonts',
            width: 170,
          },
          {
            style: 'fonts',
            stack: data.misc_items.map((i) => {
              return { text: i.qty ? parseInt(i.qty) : '' };
            }),
            width: 30,
          },
          {
            text: data.misc_items.map((i) => {
              return `$${
                i.price
                  ? parseFloat(i.price).toFixed(2)
                  : i.pricePer
                    ? parseFloat(i.pricePer).toFixed(2)
                    : 0
              } \n`;
            }),
            style: 'fonts',
            margin: [0, 0, 0, 0],
          },
          {
            text: data.misc_items.map((i) => {
              return `$${
                i.price
                  ? (parseFloat(i.price) * parseFloat(i.qty)).toFixed(2)
                  : i.pricePer
                    ? (parseFloat(i.pricePer) * parseFloat(i.qty)).toFixed(2)
                    : 0
              } \n`;
            }),
            style: 'fonts',
            alignment: 'right',
          },
        ],
        margin: [0, 2, 0, 0],
      }
      : null,
    data.misc_items.length > 0
      ? {
        text: '------------',
        margin: [0, 0, 0, 0],
        alignment: 'right',
      }
      : null,
    data.misc_items.length > 0
      ? {
        columns: [
          { text: '', style: 'totals', decoration: 'underline', width: 317 },
          {
            text: data.misc_items.length > 0 ? 'Order Sub Total' : '',
            style: 'totals',
            width: 120,
            alignment: 'right',
          },
          {
            text:
                data.misc_items.length > 0
                  ? '$' + order_sub_total.toFixed(2)
                  : '',
            style: 'fonts',
            margin: [0, 0, 0, 0],
            alignment: 'right',
          },
        ],
        margin: [0, 10, 0, 0],
      }
      : null,
    {
      columns: [
        { text: '', style: 'totals', width: 317 },
        {
          text: data.Taxable
            ? '$' +
              order_sub_total.toFixed(2) +
              ' x ' +
              data.companyprofile.TaxRate +
              '%' +
              ' Tax:'
            : '',
          style: 'totals',
          margin: [0, 0, 0, 4],
          width: 120,
          alignment: 'right',
        },
        {
          text: `${data.tax > 0 ? '$' + data.tax.toFixed(2) : ''}`,
          style: 'fonts',
          alignment: 'right',
        },
      ],
      margin: [0, 0, 0, 0],
    },
    {
      text: '======',
      margin: [0, 0, 0, 0],
      alignment: 'right',
    },
    {
      columns: [
        { text: '', style: 'totals', width: 317, decoration: 'underline' },
        {
          text: `${data.status === 'Quote' ? 'QUOTE ONLY' : 'TOTAL'}`,
          style: 'totals',
          margin: [0, 0, 0, 0],
          alignment: 'right',
          width: 120,
        },
        {
          text: `$${data.total.toFixed(2)}`,
          style: 'fonts',
          margin: [0, 0, 0, 0],
          alignment: 'right',
        },
      ],
      margin: [0, 10, 0, 0],
    },
    {
      columns: [
        { text: '', style: 'totals', width: 317, decoration: 'underline' },
        {
          text: 'Minus Balance Paid:',
          style: 'totals',
          margin: [0, 0, 0, 0],
          width: 120,
          alignment: 'right',
        },
        {
          text: `$${balancePaid.toFixed(2)}`,
          style: 'fonts',
          margin: [0, 0, 0, 0],
          alignment: 'right',
        },
      ],
      margin: [0, 2, 0, 0],
    },
    {
      text: '======',
      margin: [0, 0, 0, 0],
      alignment: 'right',
    },
    {
      columns: [
        { text: '', style: 'totals', width: 330 },
        {
          text: 'BALANCE DUE:',
          style: 'totals',
          margin: [0, 0, 0, 0],
          width: 105,
          alignment: 'right',
        },
        {
          text: `$${balanceDue.toFixed(2)}`,
          style: 'fonts',
          margin: [0, 0, 0, 0],
          alignment: 'right',
        },
      ],
      margin: [0, 10, 0, 5],
    },

    {
      stack: [
        {
          columns: [
            {
              text: 'LIMITED WARRANTY',
              decoration: 'underline',
              style: 'fontsBold',
              margin: [0, 0, 0, 10],
            },
            {
              text: `Units: ${qty.reduce((acc, item) => acc + item, 0)}`,
              style: 'fonts',
              alignment: 'right',
              margin: [0, 0, 0, 0],
            },
          ],
        },

        {
          text: 'OUR PRODUCTS ARE WARRANTED FOR 1 YEAR FROM DATE OF SHIPMENT, WARRANTY DETAILS CAN FOUND AT \n HTTPS://PORTADOOR.COM AND IN OUR 2020 CATALOG \n \n LIABILITY UNDER THIS WARRANTY SHALL BE LIMITED TO THE ORIGINAL INVOICE PRICE OF THE PRODUCT',
          style: 'warrantyFont',
          alignment: 'left',
          margin: [0, 0, 0, 5],
          id: 'liability-invoice',
        },
      ],
    },
  ];
};
