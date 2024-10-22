import java.util.*;

class Graph {
    private int V; // Số đỉnh của đồ thị
    private List<List<Node>> adj; // Danh sách kề của đồ thị

    // Node class đại diện cho cạnh và trọng số của nó
    class Node implements Comparable<Node> {
        int vertex;
        int weight;

        public Node(int v, int w) {
            vertex = v;
            weight = w;
        }

        public int compareTo(Node other) {
            return this.weight - other.weight;
        }
    }

    // Hàm tạo đồ thị với V đỉnh
    public Graph(int V) {
        this.V = V;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }

    // Thêm cạnh vào đồ thị
    public void addEdge(int u, int v, int w) {
        adj.get(u).add(new Node(v, w));
        adj.get(v).add(new Node(u, w)); // Với đồ thị vô hướng, ta cần thêm cạnh hai chiều
    }

    // Hàm thực hiện thuật toán Dijkstra
    public void dijkstra(int src) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        int[] dist = new int[V]; // Mảng lưu khoảng cách ngắn nhất từ đỉnh nguồn

        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        pq.add(new Node(src, 0));

        while (!pq.isEmpty()) {
            Node node = pq.poll();
            int u = node.vertex;

            // Duyệt qua tất cả các đỉnh kề của u
            for (Node neighbor : adj.get(u)) {
                int v = neighbor.vertex;
                int weight = neighbor.weight;

                // Nếu tìm thấy khoảng cách ngắn hơn
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.add(new Node(v, dist[v]));
                }
            }
        }

        // In kết quả
        System.out.println("Khoảng cách từ đỉnh " + src + " tới các đỉnh khác:");
        for (int i = 0; i < V; i++) {
            System.out.println("Tới đỉnh " + i + " là " + dist[i]);
        }
    }

    public static void main(String[] args) {
        Graph g = new Graph(5);

        g.addEdge(0, 1, 9);
        g.addEdge(0, 2, 6);
        g.addEdge(0, 3, 5);
        g.addEdge(0, 4, 3);
        g.addEdge(2, 1, 2);
        g.addEdge(2, 3, 4);

        g.dijkstra(0); // Tìm đường đi ngắn nhất từ đỉnh 0
    }
}
