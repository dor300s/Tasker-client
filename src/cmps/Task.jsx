import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd";


const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    background-color: white
    `;

export default class Task extends Component {
    render() {

        console.log(this.props.task)
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >

                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}
