export default interface IShakespeare {
  translate (text: string): Promise<string>
}