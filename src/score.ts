import { Node } from "./core"
import { Note } from "./core/types"

export const score = [
  new Node(1)
    .append(
      new Node(2)
        // 1st beat
        .append(
          new Node(2)
            .append(
              new Node(2)
                // 16th triplet
                .append(new Node(3).append(new Node<Note>("B1")))
                // 16th triplet
                .append(new Node(3).append(new Node<Note>("B1")))
                // 16th triplet
                .append(new Node(3).append(new Node<Note>("B1"))),
            )
            .append(new Node(2)),
        )
        // 2nd Beat
        .append(
          new Node(2)
            .append(
              new Node(2)
                // 16th triplet
                .append(new Node(3).append(new Node<Note>("B1")))
                // 16th triplet
                .append(new Node(3).append(new Node<Note>("B1")))
                // 16th triplet
                .append(new Node(3).append(new Node<Note>("B1"))),
            )
            .append(new Node(2)),
        ),
    )
    .append(
      new Node(2)
        // 3rd beat
        .append(
          new Node(2)
            // 8th
            .append(new Node(2).append(new Node<Note>("B1")))
            // 8th
            .append(new Node(2).append(new Node<Note>("B1"))),
        )
        // 4th beat
        .append(new Node(2)),
    ),
  new Node(1)
    .append(
      new Node(2)
        // 1st beat
        .append(
          new Node(2)
            // 8th quintuplet
            .append(new Node(5).append(new Node<Note>("B1")))
            // 8th quintuplet
            .append(new Node(5).append(new Node<Note>("B1")))
            // 8th quintuplet
            .append(new Node(5).append(new Node<Note>("B1")))
            // 8th quintuplet
            .append(new Node(5).append(new Node<Note>("B1")))
            // 8th quintuplet
            .append(new Node(5).append(new Node<Note>("B1"))),
        )
        // 2nd Beat
        .append(new Node(2)),
    )
    .append(
      new Node(2)
        // 3rd beat
        .append(
          new Node(2)
            // 8th
            .append(new Node(2).append(new Node<Note>("B1")))
            // 8th
            .append(new Node(2).append(new Node<Note>("B1"))),
        )
        // 4th beat
        .append(new Node(2)),
    ),
]
