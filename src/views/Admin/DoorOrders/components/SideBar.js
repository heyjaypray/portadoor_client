import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import CopeDoor from './SideBar/Cope/Door'
import MiterDoor from './SideBar/Miter/Door'
import MTDoor from './SideBar/MT/Door'
import CopeDF from './SideBar/Cope/DF'
import MiterDF from './SideBar/Miter/DF'
import MTDF from './SideBar/MT/DF'
import GlassDoor from './SideBar/Glass/Door'
import OnePieceDoor from './SideBar/One_Piece/Door'

const style = {
  margin: 'auto',
  width: '100%',
  height: 'auto'
};

const comingSoon =
  'https://res.cloudinary.com/porta-door/image/upload/v1567619819/d4apmwwcrqmpe3tilboe.png';

class SideBar extends Component {
  render() {

    const { part } = this.props;


    if(part.orderType.value === "Door") {

      if(part.construction.value === "Cope") {
        return (
          <CopeDoor part={part} />
        )
      }

      else if(part.construction.value === "M") {
        return (
          <MiterDoor part={part} />
        )
      }

      else if(part.construction.value === "MT") {
        return (
          <MTDoor part={part} />
        )
      }

      else if(part.construction.value === "Glass") {
        return (
          <GlassDoor part={part} />
        )
      }

      else {
        return (
          <div />
        )
      }

    } else if (part.orderType.value === "DF") {

      if(part.construction.value === "Cope") {
        return (
          <CopeDF part={part} />
        )
      }

      if(part.construction.value === "M") {
        return (
          <MiterDF part={part} />
        )
      }

      if(part.construction.value === "MT") {
        return (
          <MTDF part={part} />
        )
      }

      else {
        return (
          <div />
        )
      }

    } else if (part.orderType.value === "Face_Frame") {

      return (
        <div />
      )

    } else if (part.orderType.value === "One_Piece") {

      return (
        <div />
      )

    } else if (part.orderType.value === "Slab") {

      return (
        <div />
      )

    } else {
      return (
        <div />
      );
    }
  }
}

export default SideBar;
