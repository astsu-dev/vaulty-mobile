import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function PlusIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M9.6 15.04a.96.96 0 100 1.92v-1.92zm6.4 1.92a.96.96 0 100-1.92v1.92zm0-1.92a.96.96 0 000 1.92v-1.92zm6.4 1.92a.96.96 0 100-1.92v1.92zM16.96 16a.96.96 0 10-1.92 0h1.92zm-1.92 6.4a.96.96 0 001.92 0h-1.92zm0-6.4a.96.96 0 001.92 0h-1.92zm1.92-6.4a.96.96 0 10-1.92 0h1.92zM9.6 16.96H16v-1.92H9.6v1.92zm6.4 0h6.4v-1.92H16v1.92zm0-.96h-.96v.016s0 .001 0 0V22.4h1.92v-.037-.038-.037-.037-.037-.036-.037-.036-.037-.036-.036-.036-.035-.036-.035-.036-.035-.035-.034-.035-.035-.034-.034-.035-.034-.033-.034-.034-.033-.034-.033-.033-.032-.033-.033-.033-.032-.032-.032-.032-.032-.031-.032-.031-.032-.03-.032-.03-.031-.03-.031-.03-.03-.031-.03-.03-.03-.029-.03-.029-.029-.029-.029-.029-.028-.029-.028-.028-.029-.028-.027-.028-.028-.027-.028-.027-.027-.027-.027-.027-.026-.027-.026-.027-.026-.026-.026-.025-.026-.026-.025-.025-.026-.024-.025-.025-.025-.025-.024-.024-.025-.024-.024-.024-.023-.024-.023-.024-.023-.023-.023-.023-.023-.023-.023-.022-.022-.023-.022-.022-.022-.022-.021-.022-.021-.022-.021-.021-.021-.021-.02-.022-.02-.02-.021-.02-.02-.02-.02-.02-.02-.02-.02-.019-.02-.018-.02-.018-.02-.018-.019-.018-.019-.018-.018-.019-.018-.018-.018-.017-.018-.018-.017-.018-.017-.017-.017-.017-.017-.017-.016-.017-.016-.017-.016-.016-.017-.016-.015-.016-.016-.015-.016-.015-.016-.015-.015-.015-.015-.015-.015-.015-.014-.015-.014-.014-.015-.014-.014-.014-.014-.014-.013-.014-.013-.014-.013-.014-.013-.013-.013-.013-.012-.013-.013-.012-.013-.012-.013-.012-.012-.012-.012-.012-.012-.012-.011-.012-.011-.012-.011-.011-.012-.01-.012-.01-.012-.01-.01-.012-.01-.01-.011-.01-.01-.01-.01-.01-.01-.01-.01-.01-.01-.01-.009-.01-.008-.01-.009-.009-.01-.008-.009-.009-.009-.008-.009-.008-.009-.008-.009-.008-.008-.008-.008-.008-.008-.008-.008-.008-.007-.008-.007-.008-.007-.008-.007-.007-.007-.007-.007-.007-.007-.007-.007-.007-.006-.007-.006-.007-.006-.006-.007-.006-.006-.006-.006-.006-.006-.006-.006-.006-.005-.006-.006-.005-.006-.005-.005-.006-.005-.005-.005-.005-.005-.005-.005-.005-.005-.005-.004-.005-.005-.004-.005-.004-.005-.004-.004-.004-.005-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.003-.004-.003-.004-.004-.003-.003-.004-.003-.003-.003-.004-.003-.003-.003-.003-.003-.002-.003-.003-.003-.003-.003-.002-.003-.002-.003-.002-.003-.002-.003-.002-.002-.003-.002-.002-.002-.003-.002-.002-.002-.002-.002-.002-.002-.002-.001-.002-.002-.002-.001-.002-.002-.001-.002-.002-.001-.002-.001-.001-.002-.001-.002-.002-.002-.002-.002-.003-.002-.002-.002-.002-.002-.001-.002-.001-.002-.001-.002-.002-.001-.002-.001-.002-.002V16 16H16zm.96 0V9.6h-1.92V16h1.92z"
        fill={color}
      />
    </BaseIcon>
  );
}