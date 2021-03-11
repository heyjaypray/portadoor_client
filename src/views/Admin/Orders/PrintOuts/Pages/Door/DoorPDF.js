import pdfMake from 'pdfmake-lite/build/pdfmake';
import vfsFonts from 'pdfmake-lite/build/vfs_fonts';
import Acknowledgement from '../../Door_PDF/Acknowledgement';
import Invoice from '../../Door_PDF/Invoice';
import AssemblyList from '../../Door_PDF/AssemblyList';
import StilesPage from '../../Door_PDF/StilesPage';
import RailsPage from '../../Door_PDF/RailsPage';
import PanelsPage from '../../Door_PDF/PanelsPage';
import MaterialsList from '../../Door_PDF/MaterialsList';
import QC_Checklist from '../../Door_PDF/QC_Checklist';
import Profiles from '../../Door_PDF/Profiles';
import Packing_Slip from '../../Door_PDF/Packing_Slip';

export default (
  data,
  edges,
  moulds,
  miter,
  mt,
  panels,
  appliedProfiles,
  breakdowns,
  p
) => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  let Content = [];

  for (let i = 0; i < p.acknowledgement; i++) {
    Content.push(Acknowledgement(data, breakdowns));
  }

  for (let i = 0; i < p.invoice; i++) {
    Content.push(Invoice(data, breakdowns));
  }

  for (let i = 0; i < p.assembly_list; i++) {
    Content.push(AssemblyList(data, breakdowns));
  }

  for (let i = 0; i < p.panels; i++) {
    Content.push(PanelsPage(data, breakdowns));
  }

  for (let i = 0; i < p.stiles; i++) {
    Content.push(StilesPage(data, breakdowns));
  }

  for (let i = 0; i < p.rails; i++) {
    Content.push(RailsPage(data, breakdowns));
  }

  for (let i = 0; i < p.profiles; i++) {
    Content.push(
      Profiles(
        data,
        edges,
        moulds,
        miter,
        mt,
        panels,
        appliedProfiles,
        breakdowns
      )
    );
  }


  for (let i = 0; i < p.materials; i++) {
    Content.push(MaterialsList(data, breakdowns));
  }

  
  for (let i = 0; i < p.packing_slip; i++) {
    Content.push(Packing_Slip(data, breakdowns));
  }

  for (let i = 0; i < p.qc; i++) {
    Content.push(QC_Checklist(data, breakdowns));
  }

  const rowLen = Content.length;
  const ContentSorted = Content.map((i, index) => {
    if (rowLen === index + 1) {
      return [i];
    } else {
      return [i, { text: '', pageBreak: 'before' }];
    }
  });

  const documentDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: ContentSorted,
    pageMargins: [40, 40, 40, 60],
    pageBreakBefore: function (
      currentNode,
      followingNodesOnPage,
      nodesOnNextPage,
      previousNodesOnPage
    ) {
      return (
        currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
      );
    },
    styles: {
      woodtype: {
        fontSize: 18,
        bold: true,
      },
      fonts: {
        fontSize: 10,
      },
      fontsBold: {
        fontSize: 10,
        bold: true,
      },
      headerFont: {
        fontSize: 12,
        bold: true,
      },
      tableBold: {
        fontSize: 9,
        bold: true,
      },
      totals: {
        fontSize: 10,
        bold: true,
      },
      warrantyFont: {
        fontSize: 7,
      },
    },
  };
  // const fileName = `Order_${data.orderNum}`
  pdfMake.createPdf(documentDefinition).open();
};
