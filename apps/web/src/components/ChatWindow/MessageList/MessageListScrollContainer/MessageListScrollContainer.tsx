/* istanbul ignore file */
import React from 'react';

import { Button } from '@twilio-paste/core/button';
import { Box } from '@twilio-paste/core/box';

import { ArrowDownIcon } from '@twilio-paste/icons/esm/ArrowDownIcon';

import { Message } from '@twilio/conversations/lib/message';
import throttle from 'lodash.throttle';

interface MessageListScrollContainerProps {
  messages: Message[];
}

interface MessageListScrollContainerState {
  isScrolledToBottom: boolean;
  showButton: boolean;
  messageNotificationCount: number;
}

/*
 * This component is a scrollable container that wraps around the 'MessageList' component.
 * The MessageList will ultimately grow taller than its container as it continues to receive
 * new messages, and users will need to have the ability to scroll up and down the chat window.
 * A "new message" button will be displayed when the user receives a new message, and is not scrolled
 * to the bottom. This button will be hidden if the user clicks on it, or manually scrolls
 * to the bottom. Otherwise, this component will auto-scroll to the bottom when a new message is
 * received, and the user is already scrolled to the bottom.
 *
 * Note that this component is tested with Cypress only.
 */
export class MessageListScrollContainer extends React.Component<
  MessageListScrollContainerProps,
  MessageListScrollContainerState
> {
  chatThreadRef = React.createRef<HTMLDivElement>();
  state = { isScrolledToBottom: true, showButton: false, messageNotificationCount: 0 };

  scrollToBottom() {
    const innerScrollContainerEl = this.chatThreadRef.current!;
    innerScrollContainerEl.scrollTop = innerScrollContainerEl!.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
    this.chatThreadRef.current!.addEventListener('scroll', this.handleScroll);
  }

  // This component updates as users send new messages:
  componentDidUpdate(prevProps: MessageListScrollContainerProps, prevState: MessageListScrollContainerState) {
    const hasNewMessages = this.props.messages.length !== prevProps.messages.length;

    if (prevState.isScrolledToBottom && hasNewMessages) {
      this.scrollToBottom();
    } else if (hasNewMessages) {
      const numberOfNewMessages = this.props.messages.length - prevProps.messages.length;

      this.setState(previousState => ({
        // If there's at least one new message, show the 'new message' button:
        showButton: !previousState.isScrolledToBottom,
        // If 'new message' button is visible,
        // messageNotificationCount will be the number of previously unread messages + the number of new messages.
        // Otherwise, messageNotificationCount is set to 1:
        messageNotificationCount: previousState.showButton
          ? previousState.messageNotificationCount + numberOfNewMessages
          : 1,
      }));
    }
  }

  handleScroll = throttle(() => {
    const innerScrollContainerEl = this.chatThreadRef.current!;
    // Because this.handleScroll() is a throttled method,
    // it's possible that it can be called after this component unmounts, and this element will be null.
    // Therefore, if it doesn't exist, don't do anything:
    if (!innerScrollContainerEl) return;

    // On systems using display scaling, scrollTop may return a decimal value, so we need to account for this in the
    // "isScrolledToBottom" calculation.
    const isScrolledToBottom =
      Math.abs(
        innerScrollContainerEl.clientHeight + innerScrollContainerEl.scrollTop - innerScrollContainerEl!.scrollHeight
      ) < 1;

    this.setState(prevState => ({
      isScrolledToBottom,
      showButton: isScrolledToBottom ? false : prevState.showButton,
    }));
  }, 300);

  handleClick = () => {
    const innerScrollContainerEl = this.chatThreadRef.current!;

    innerScrollContainerEl.scrollTo({ top: innerScrollContainerEl.scrollHeight, behavior: 'smooth' });

    this.setState({ showButton: false });
  };

  componentWillUnmount() {
    const innerScrollContainerEl = this.chatThreadRef.current!;

    innerScrollContainerEl.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Box
        position="relative"
        height="100%"
        overflowY="auto"
        paddingBottom="space50"
        paddingX="space60"
        data-cy-message-list-inner-scroll
        ref={this.chatThreadRef}
      >
        {this.props.children}

        <Box
          visibility={this.state.showButton ? 'visible' : 'hidden'}
          opacity={this.state.showButton ? 1 : 0}
          transition="all 0.5s ease"
          position="absolute"
          boxShadow="shadow"
          bottom="space50"
          right="space90"
        >
          <Button onClick={this.handleClick} variant="primary" data-cy-new-message-button>
            <ArrowDownIcon decorative />
            {this.state.messageNotificationCount} new message
            {this.state.messageNotificationCount > 1 && 's'}
          </Button>
        </Box>
      </Box>
    );
  }
}

export default MessageListScrollContainer;
