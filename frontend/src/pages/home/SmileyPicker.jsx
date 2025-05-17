import { EmojiPicker } from "@ferrucc-io/emoji-picker";

const SmileyPicker = ({onEmojiSelect}) => {
  
  return (
      <>
                    <EmojiPicker onEmojiSelect={onEmojiSelect} lazyLoad>
                      <EmojiPicker.Header>
                        <EmojiPicker.Input placeholder="Search emoji" />
                      </EmojiPicker.Header>
                      <EmojiPicker.Group>
                        <EmojiPicker.List />
                      </EmojiPicker.Group>
                    </EmojiPicker>
                  </>
  )
}

export default SmileyPicker;