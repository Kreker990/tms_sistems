import Emitter from 'tiny-emitter';

class EventEmitterSingleton {
  static getInstance() {
    if (!this.instance) {
      console.log('creating instance');
      this.instance = new EventEmitterSingleton();
    }
    return this.instance;
  }

  constructor() {
    if (EventEmitterSingleton.instance) {
      // eslint-disable-next-line no-constructor-return
      return EventEmitterSingleton.instance;
    }

    this.emitter = new Emitter();

    // Attach methods to the instance
    this.on = this.emitter.on.bind(this.emitter);
    this.off = this.emitter.off.bind(this.emitter);
    this.emit = this.emitter.emit.bind(this.emitter);

    // Store the single instance
    EventEmitterSingleton.instance = this;
  }
}

const eventEmitter = EventEmitterSingleton.getInstance();
export default eventEmitter;
